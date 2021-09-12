import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./Button";

describe("Button component tests", () => {
  const onButtonClick = jest.fn();
  const getComponent = (props: Partial<ButtonProps>) =>
    render(
      <Button
        id="button"
        isButtonDisabled={false}
        value="some value"
        text="some text"
        onButtonClick={onButtonClick}
        {...props}
      />
    );

  test("button should be rendered in default state", () => {
    getComponent({});
    expect(
      screen
        .getByRole("button", {
          name: /some text/i,
        })
        .getAttribute("disabled")
    ).toBeNull();
  });

  test("button should be rendered in disabled state", () => {
    getComponent({ isButtonDisabled: true });
    expect(
      screen
        .getByRole("button", {
          name: /some text/i,
        })
        .getAttribute("disabled")
    ).toStrictEqual("");

    expect(
      screen.getByRole("button", {
        name: /some text/i,
      })
    ).toHaveStyle("pointer-events: none; background: #c0c0c0;");
  });

  test("should invoke onButtonClick when clicked", () => {
    getComponent({});

    fireEvent.click(
      screen.getByRole("button", {
        name: /some text/i,
      })
    );
    expect(onButtonClick).toHaveBeenCalledTimes(1);
    expect(onButtonClick).toHaveBeenCalledWith("some value");
  });
});
