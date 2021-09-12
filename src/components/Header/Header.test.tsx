import { render, screen } from "@testing-library/react";
import Header, { HeaderProps } from "./Header";
import logo from "../../assets/logo.png";

describe("Header component test", () => {
  const getComponent = (props: Partial<HeaderProps>) =>
    render(<Header id="header" headerTitle="header title" {...props} />);

  test("should render header with required props", () => {
    getComponent({});
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("header-title")).toHaveTextContent(
      "header title"
    );
    expect(screen.queryByTestId("header-avatar")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("header-title-subtext")
    ).not.toBeInTheDocument();
  });

  test("should render header with optional props", () => {
    getComponent({
      avatarSrc: logo,
      headerSubtext: "sub text",
    });
    expect(screen.getByTestId("header-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("header-title-subtext")).toHaveTextContent(
      "sub text"
    );
  });
});
