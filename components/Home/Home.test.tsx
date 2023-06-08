import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("./Home"), {
  ssr: false,
});

describe("Home", () => {
  it("should add new node to canvas when clicking Add", async () => {
    render(<Home />);
    const nameInput = await screen.findByPlaceholderText("New Activity");
    userEvent.type(nameInput, "Dummy Activity");
    const addButton = screen.getByText("Add Activity");
    fireEvent.click(addButton);
    expect(screen.getByText("Dummy Activity")).toBeDefined();
  });
});
