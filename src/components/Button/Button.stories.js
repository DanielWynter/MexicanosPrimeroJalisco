import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,

  argTypes: {
    type: {
      options: ["icon-only", "right-icon", "left-icon", "default"],
      control: { type: "select" },
    },
    style: {
      options: ["primary", "white"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    type: "icon-only",
    style: "primary",
    className: {},
    text: "Button",
  },
};
