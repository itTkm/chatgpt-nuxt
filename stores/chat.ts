import { defineStore } from "pinia";
import {
  ChatItem,
  ChatMessage,
  ChatMessageExItem,
  ChatMessageExOption,
  ChatOption,
  ChatRole,
} from "@/types";

export const useChatStore = defineStore("chat", () => {
  const decoder = new TextDecoder("utf-8");
  const db = new ChatDB();

  let controller: AbortController;

  const showSetting = ref(false);
  const chats = ref<ChatItem[]>([]);
  const chat = ref<ChatItem>();
  const messages = ref<ChatMessageExItem[]>([]);
  const messageContent = ref("");
  const talkingChats = ref(new Set<number>([]));

  // talking

  const talking = computed(
    () => talkingChats.value.has(chat.value?.id ?? 0) ?? false
  );

  function startTalking(chatId: number) {
    talkingChats.value.add(chatId);
  }

  function endTalking(chatId: number) {
    talkingChats.value.delete(chatId);
  }

  // chat

  async function getAllChats() {
    chats.value = (await db.chat.reverse().toArray()) as ChatItem[];

    // 没有则创建
    if (!chats.value.length) {
      await createChat();
    } else {
      await openChat(chats.value[0]);
    }
  }

  async function createChat(item?: ChatOption) {
    const chatItem: ChatOption = item ?? { name: "New Chat", order: 0 };
    await db.chat.put({ ...chatItem });

    // 加载列表并打开第一个
    await getAllChats();
    await openChat(chats.value[0]);
  }

  async function openChat(item: ChatItem) {
    chat.value = item;
    await getChatMessages(item.id);
  }

  async function removeChat(chatId: number) {
    await db.transaction("rw", "chat", "message", async () => {
      await db.chat.delete(chatId);
      await clearMessages(chatId);
    });
    await getAllChats();
  }

  async function reChatName(chatId: number, name: string) {
    await db.chat.update(chatId, { name });
    await getAllChats();
  }

  // message

  const standardList = computed(() =>
    messages.value
      .filter((item) => item.active && !item.error && item.content)
      .map((item) => ({
        role: item.role,
        content: item.content,
      }))
  );

  const setNotActiveDbMessages = () => {
    return db.message.toCollection().modify({ active: false });
  };

  async function getChatMessages(chatId: number) {
    messages.value = (await db.message
      .where("chatId")
      .equals(chatId)
      .toArray()) as ChatMessageExItem[];
  }

  async function clearMessages(chatId: number) {
    await db.message.where("chatId").equals(chatId).delete();
    await getChatMessages(chatId);
  }

  async function createMessage(message: ChatMessageExOption) {
    if (!chat.value && !message.chatId) await createChat();

    const chatId = message.chatId ?? (chat.value as ChatItem).id;

    message.chatId = chatId;
    message.active = message.active ?? true;
    message.show = message.show ?? true;
    message.error = message.error ?? false;
    message.errorMessage = message.errorMessage ?? undefined;
    message.sendDate = Date.now();

    const id = await db.message.put({ ...message });
    await getChatMessages(chatId);

    return id;
  }

  async function updateMessageContent(id: number, content: string) {
    await db.message.update(id, { content });
    await getChatMessages((chat.value as ChatItem).id);
  }

  async function makeErrorMessage(id: number, errorMessage: string) {
    await db.message.update(id, { error: true, errorMessage });
    await getChatMessages((chat.value as ChatItem).id);
  }

  function stop() {
    controller?.abort();
  }

  function clearSendMessageContent() {
    messageContent.value = "";
  }

  async function sendMessage(message: ChatMessageExOption) {
    if (talking.value) return;
    if (!message?.content.trim()) return;

    const chatId = message.chatId ?? chat.value?.id;
    if (!chatId) return;

    clearSendMessageContent();
    startTalking(chatId);

    // 追加到消息队列
    await createMessage(message);
    const assistantId = await createMessage({
      role: "assistant",
      content: "",
      chatId,
    });

    // 用于主动中断请求
    controller = new AbortController();

    try {
      // 打印标准列表
      console.log(standardList.value);

      // 发送请求
      const setting = loadSetting();
      const { status, body } = await fetch("/api/chat", {
        method: "post",
        body: JSON.stringify({
          apiKey: setting.apiKey,
          temperature: setting.temperature,
          messages: standardList.value,
        }),
        signal: controller.signal,
      });

      // 读取流
      let content = "";
      const reader = body?.getReader();
      while (reader) {
        const { done, value } = await reader.read();

        if (done) break;

        const text = decoder.decode(value);
        const dataList = status === 200 ? text.match(/({.*?]})/g) : [text];

        dataList?.forEach(async (textData) => {
          const data = JSON.parse(textData);
          if (status === 200) {
            content += data.choices[0].delta.content ?? "";
            await updateMessageContent(assistantId, content);
          } else {
            await makeErrorMessage(
              assistantId,
              status === 500 ? data.message : data.error.message
            );
          }
        });
      }
    } catch (e: any) {
      await makeErrorMessage(
        assistantId,
        `\n\n**${e.name === "AbortError" ? "已停止回答" : e.message}**`
      );
    } finally {
      endTalking(chatId);
    }
  }

  return {
    showSetting,
    chats,
    chat,
    messages,
    messageContent,
    talking,
    stop,
    openChat,
    reChatName,
    setNotActiveDbMessages,
    getChatMessages,
    getAllChats,
    createChat,
    clearMessages,
    removeChat,
    appendMessage: createMessage,
    sendMessage,
  };
});
