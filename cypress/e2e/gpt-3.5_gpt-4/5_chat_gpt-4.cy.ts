/// <reference types="cypress" />

describe("チャット (GPT-4)", () => {
  before(() => {});

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  afterEach(() => {});

  after(() => {});

  context("モデル切り替え", () => {
    it("GPT3.5 -> GPT-4", () => {
      // TODO: 「GPT-4」をクリック
      // TODO: タイトル横に「GPT-4」が表示されること
    });

    it("GPT4 -> GPT-3.5", () => {
      // TODO: 「GPT-3.5」をクリック
      // TODO: タイトル横に「GPT-3.5」が表示されること
    });
  });

  context("メッセージ送信", () => {
    it("メッセージを送信し、レスポンスを受け取れること", () => {
      // TODO: 「GPT-4」をクリック
      // TODO: メッセージを送信し、レスポンスを受け取れること
    });
  });
});
