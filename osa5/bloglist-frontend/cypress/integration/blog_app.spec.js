const { _ } = Cypress;

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Teppo Testaaja",
      username: "teppo_the_tester",
      password: "hunter2",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("[data-testid=username-field]").type("teppo_the_tester");
      cy.get("[data-testid=password-field]").type("hunter2");
      cy.get("[data-testid=login-button]").click();
      cy.contains("Successfully logged in as teppo_the_tester");
      cy.contains("blogs");
      cy.contains("Create new");
    });

    it("fails with wrong credentials", function () {
      cy.get("[data-testid=username-field]").type("teppo_the_tester");
      cy.get("[data-testid=password-field]").type("hunter");
      cy.get("[data-testid=login-button]").click();
      cy.contains("Wrong username or password");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "teppo_the_tester",
        password: "hunter2",
      };
      cy.request("POST", "http://localhost:3003/api/login", user).then(
        (response) => {
          localStorage.setItem("blogListUser", JSON.stringify(response.body));
          cy.visit("http://localhost:3000");
        }
      );
    });

    it("A blog can be created", function () {
      cy.get("[data-testid=title-field]").type("Teppo on paras");
      cy.get("[data-testid=author-field]").type("Einari Tikkanen");
      cy.get("[data-testid=url-field]").type("http://www.suomi24.fi");
      cy.get("[data-testid=submit-button]").click();
      cy.contains("Einari Tikkanen");
      cy.contains("Teppo on paras");
      cy.get("[data-testid=view-button]").click();
      cy.get("[data-testid=likes-text]").contains("likes 0");
    });

    it("A blog can be liked", function () {
      cy.get("[data-testid=title-field]").type("Teppo on paras");
      cy.get("[data-testid=author-field]").type("Einari Tikkanen");
      cy.get("[data-testid=url-field]").type("http://www.suomi24.fi");
      cy.get("[data-testid=submit-button]").click();
      cy.get("[data-testid=view-button]").click();
      cy.get("[data-testid=like-button]").click();
      cy.get("[data-testid=likes-text]").contains("likes 1");
    });

    it("A blog can be removed", function () {
      cy.get("[data-testid=title-field]").type("Teppo on paras");
      cy.get("[data-testid=author-field]").type("Einari Tikkanen");
      cy.get("[data-testid=url-field]").type("http://www.suomi24.fi");
      cy.get("[data-testid=submit-button]").click();
      cy.get("[data-testid=view-button]").click();
      cy.get("[data-testid=remove-button]").click();
      cy.get("html").contains("Successfully removed blog");
      cy.get("html").should("not.contain", "Teppo on paras");
      cy.visit("http://localhost:3000");
      cy.get("html").should("not.contain", "Teppo on paras");
    });

    it("Blogs are sorted by likes", function () {
      const numberOfBlogs = 5;
      for (let i = 1; i <= numberOfBlogs; i++) {
        const blogName = `Blog ${i}`;
        cy.get("[data-testid=title-field]").type(blogName);
        cy.get("[data-testid=author-field]").type("Einari Tikkanen");
        cy.get("[data-testid=url-field]").type("http://www.suomi24.fi");
        cy.get("[data-testid=submit-button]").click();
        cy.get(`[data-cy="${blogName}"]`)
          .find("[data-testid=view-button]")
          .click();
        cy.contains(blogName);
        for (let j = 1; j <= i; j++) {
          cy.get(`[data-cy="${blogName}"]`)
            .find("[data-testid=like-button]")
            .click();
          cy.get(`[data-cy="${blogName}"]`)
            .find("[data-testid=likes-text]")
            .contains(`likes ${j}`);
        }
      }
      const regex = /(likes )(\d)/;
      cy.get("[data-testid=blog]")
        .then((result) => _.map(result, "textContent"))
        .then((textContents) =>
          textContents.map((textContent) => textContent.match(regex)[2])
        )
        .then((likes) => {
          const sorted = _.sortBy(likes, (x) => -x);
          expect(likes, "likes are sorted").to.deep.equal(sorted);
        });
    });
  });
});
