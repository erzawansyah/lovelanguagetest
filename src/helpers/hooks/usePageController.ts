import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type State = {
  page: {
    current: number;
    total: number;
    next: number;
    previous: number;
    isLast: boolean;
    isFirst: boolean;
    isIntro: boolean;
  };
  progress: number;
};

export const usePageController = () => {
  const [page, setPage] = React.useState<State["page"]>();
  const [progress, setProgress] = React.useState<State["progress"]>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // set initial page state from search params
  React.useEffect(() => {
    if (!page) {
      const page = searchParams.get("page") || "1";
      const total = searchParams.get("total") || "1";
      setPage({
        current: parseInt(page),
        total: parseInt(total),
        next: parseInt(page) + 1,
        previous: parseInt(page) - 1,
        isLast: false,
        isFirst: false,
        isIntro: true,
      });
    }
  }, [searchParams, page]);

  // set progress state from current page change
  React.useEffect(() => {
    if (page) {
      const progress = page.current / page.total;
      setProgress(progress);
    }
  }, [page]);
};
