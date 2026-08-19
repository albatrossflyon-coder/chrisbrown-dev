import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("has an id=\"contact\" anchor for the navbar's Contact link to target", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer#contact")).not.toBeNull();
  });

  it("links to email, LinkedIn, and GitHub", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:albatrossflyon1@gmail.com"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/chris-brown-2327a73b1/"
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/albatrossflyon-coder"
    );
  });

  it("never renders a phone number", () => {
    render(<Footer />);
    expect(screen.queryByText(/\(\d{3}\)\s?\d{3}-\d{4}/)).toBeNull();
  });
});
