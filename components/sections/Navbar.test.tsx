import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("hides the mobile menu panel until the hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    expect(screen.queryByRole("link", { name: "Projects" })).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: "Open menu" })
    ).not.toBeNull();

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Close menu" })).toBeTruthy();
  });

  it("closes the mobile menu after a link inside it is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const contactLinks = screen.getAllByRole("link", { name: "Contact" });
    // The last "Contact" link in the DOM is the one rendered inside the mobile panel.
    await user.click(contactLinks[contactLinks.length - 1]);

    expect(screen.getByRole("button", { name: "Open menu" })).toBeTruthy();
  });

  it("links out to GitHub and LinkedIn with target=_blank", () => {
    render(<Navbar />);

    const github = screen.getAllByRole("link", { name: "GitHub" })[0];
    const linkedin = screen.getAllByRole("link", { name: "LinkedIn" })[0];

    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(linkedin).toHaveAttribute("target", "_blank");
  });
});
