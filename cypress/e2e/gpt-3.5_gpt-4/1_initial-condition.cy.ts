/// <reference types="cypress" />

// meta
const appTitle = "ChatGPT";
const appDescription =
  "AI conversations based on the ChatGPT natural language model from OpenAI";

// LogoBar
const appIconClass = "i-icon-robot";

// ChatList
const conversationLabel = "会話";
const initialChatTitle = "New Chat";
const chatIconClass = "i-icon-message";

// FuncBar
const newChatLabel = "新規チャット";
const settingLabel = "設定";
const projectLabel = "プロジェクト";
const copyright = ""; // TODO:

describe("初期状態", () => {
  before(() => {});

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  afterEach(() => {});

  after(() => {});

  context("メタデータ", () => {
    it("title が設定されていること", () => {
      cy.get("head title").shouldHaveText(appTitle);
    });

    it("description が設定されていること", () => {
      cy.get("head meta[name=description]")
        .should("have.attr", "content")
        .should("include", appDescription);
    });
  });

  context("ChatSideBar", () => {
    it("表示されていること", () => {
      cy.chatSideBar().shouldBeVisible();
    });

    it("3つの子要素を含むこと", () => {
      cy.chatSideBar().children("div").shouldHaveLength(3);
    });
  });

  context("LogoBar", () => {
    it("表示されていること", () => {
      cy.logoBar().shouldBeVisible();
    });

    it("アプリアイコンが表示されていること", () => {
      cy.logoBar().findIcon(appIconClass).shouldBeVisible();
    });

    it("アプリタイトルが表示されていること", () => {
      cy.logoBar().contains(appTitle).shouldBeVisible();
    });
  });

  context("ChatList", () => {
    it("表示されていること", () => {
      cy.chatList().shouldBeVisible();
    });

    it("チャット一覧に「会話」が表示されていること", () => {
      cy.chatList().contains(conversationLabel).shouldBeVisible();
    });

    it("チャット一覧の「会話」に1件だけ含まれること", () => {
      cy.chatListItems().shouldHaveLength(1);
    });

    it("チャット一覧の「会話」に「New Chat」が表示されていること", () => {
      cy.chatListItems().eq(0).contains(initialChatTitle).shouldBeVisible();
    });

    it("チャット一覧の「会話」の「New Chat」にアイコンが表示されていること", () => {
      cy.chatListItems().eq(0).findIcon(chatIconClass).shouldBeVisible();
    });

    it("チャット一覧の「会話」の「New Chat」が選択されていること", () => {
      cy.chatListItems().eq(0).invoke("attr", "class").should("match", /bg\-/);
    });
  });

  context("FuncBar", () => {
    it("表示されていること", () => {
      cy.funcBar().shouldBeVisible();
    });

    it("3つの子要素を含むこと", () => {
      cy.funcBar().children("div").shouldHaveLength(3);
    });

    it("「新規チャット」が表示されていること", () => {
      cy.funcBar().contains(newChatLabel).shouldBeVisible();
    });

    it("「設定」が表示されていること", () => {
      cy.funcBar().contains(settingLabel).shouldBeVisible();
    });

    it("「プロジェクト」が表示されていないこと", () => {
      cy.funcBar().shouldNotIncludeText(projectLabel);
    });

    it("「コピーライト」が表示されていること", () => {
      // TODO:
    });
  });

  context("ChatTitleBar", () => {
    it("表示されていること", () => {
      // TODO:
    });

    it("「チャット」アイコンが表示されていること", () => {
      // TODO:
    });

    it("タイトルに「New Chat」が表示されていること", () => {
      // TODO:
    });

    it("タイトル横にモデル名「GPT-3.5」が表示されていること", () => {
      // TODO:
    });

    it("「ヘルプ」ボタンが表示されていること", () => {
      // TODO:
    });

    it("「履歴クリア」ボタンが表示されていること", () => {
      // TODO:
    });
  });

  context("ChatContentBar", () => {
    it("表示されていること", () => {
      // TODO:
    });

    it("「モデル切り替え」ボタンが表示されていること", () => {
      // TODO:
    });

    it("サンプルプロンプトが表示されていること", () => {
      // TODO:
    });

    it("メッセージ入力欄が表示されていること", () => {
      // TODO:
    });
  });

  context("ChatModelSelector", () => {
    it("表示されていること", () => {
      // TODO:
    });

    it("「モデル切り替え」ボタンで「GPT-3.5」が選択されていること", () => {
      // TODO:
    });
  });

  context("ChatWelcome", () => {
    it("表示されていること", () => {
      // TODO:
    });

    it("サンプルプロンプトが適切に表示されていること", () => {
      // TODO:
    });
  });

  context("ChatSendBar", () => {
    it("表示されていること", () => {
      // TODO:
    });

    it("メッセージ入力欄が表示されていること", () => {
      // TODO:
    });

    it("メッセージ入力欄にプレースホルダが表示されていること", () => {
      // TODO:
    });

    it("メッセージ送信ボタンが表示されていること", () => {
      // TODO:
    });

    it("メッセージ送信ボタンがクリック可能であること", () => {
      // TODO:
    });
  });
});
