import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export const AuthenticationGuard = ({
  component,
}: {
  component: ComponentType;
}) => {
  const Component = withAuthenticationRequired(component);

  return <Component />;
};
