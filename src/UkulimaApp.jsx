import { AuthProvider } from "./auth";
import { AppRouter } from "./router/AppRouter";

export const UkulimaApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
