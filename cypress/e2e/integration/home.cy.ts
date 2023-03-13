context("Home", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/posts", {
      count: 2,
      rows: [makeFakePost(1, "Fake post #1"), makeFakePost(2, "Fake post #2")],
    }).as("getApi");
  });

  it("should check homepage h1", () => {
    cy.get("h1").should("contain.text", "Codaisseur Coders Network");
  });

  it("should contain article", () => {
    cy.get("body").should("contain.text", "Fake post #1");
    cy.get("body").should("contain.text", "Fake post #2");
  });
});

function makeFakePost(id: number, title: string) {
  return {
    id,
    title,
    content: "Bla bla bla",
    createdAt: "2020-10-06T14:05:05.976Z",
    updatedAt: "2020-10-06T14:05:06.258Z",
    author_id: 2,
    tags: [],
    post_likes: [],
  };
}
