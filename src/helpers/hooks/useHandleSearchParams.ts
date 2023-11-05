import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useHandleSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const replace = useCallback(
    ({ key, value }: { key: string; value: any }): void => {
      if (typeof key !== "string" || !key) {
        throw new Error("Key must be a non-empty string");
      }

      const old = searchParams.toString();
      const array = old.split("&").map((item) => {
        const k = item.split("=")[0];
        if (k === key) return `${key}=${value}`;
        return item;
      });
      return router.replace(`${pathname}?${array.join("&")}`);
    },
    [searchParams, pathname, router]
  );

  const add = useCallback(
    ({ key, value }: { key: string; value: any }): void => {
      if (typeof key !== "string" || !key) {
        throw new Error("Key must be a non-empty string");
      }

      const old = searchParams.toString();
      return router.replace(`${pathname}?${old}&${key}=${value}`);
    },
    [searchParams, router, pathname]
  );

  const bulk = useCallback(
    (kv: { key: string; value: any }[]): void => {
      if (!Array.isArray(kv)) {
        throw new Error("Input must be an array");
      }

      kv.forEach((item) => {
        if (typeof item.key !== "string" || !item.key) {
          throw new Error("Key must be a non-empty string");
        }
      });

      const old = searchParams.toString();
      const keys = kv.map((item) => item.key);

      const array = old.split("&").map((item) => {
        const key = item.split("=")[0];
        if (keys.includes(key)) {
          const match = kv.find((item) => item.key === key);
          return match ? `${match.key}=${match.value}` : "";
        }
        return item;
      });

      return router.replace(`${pathname}?${array.join("&")}`);
    },
    [searchParams, pathname, router]
  );

  return {
    ...searchParams,
    pathname,
    replace,
    add,
    bulk,
  };
};
