import { RouteComponentProps } from "react-router-dom";

declare module "SearchTypes" {
  interface SearchProps {
    history: RouteComponentProps["history"];
    match: RouteComponentProps["match"];
    user: User;
  }
}

export { SearchProps };
