"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
