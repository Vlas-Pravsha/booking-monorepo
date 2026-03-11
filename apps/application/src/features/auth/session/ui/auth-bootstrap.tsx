"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { isApiError } from "@/shared/api";

import {
  authQueryKeys,
  useCurrentUserQuery,
  useRefreshSessionMutation,
} from "../api";
import { selectAuthSession, selectIsAuthHydrated } from "../model/selectors";
import {
  clearSession,
  hydrateSession,
  setSession,
  updateUser,
} from "../model/slice";
import {
  readStoredAuthSession,
  writeStoredAuthSession,
} from "../model/storage";
import type { AuthSession } from "../model/types";

const useHydrateStoredSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateSession(readStoredAuthSession()));
  }, [dispatch]);
};

const usePersistStoredSession = (
  isHydrated: boolean,
  session: AuthSession | null
) => {
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    writeStoredAuthSession(session);
  }, [isHydrated, session]);
};

const useAuthSessionSync = (
  isHydrated: boolean,
  session: AuthSession | null
) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const hasTriedRefreshRef = useRef(false);
  const currentUserQuery = useCurrentUserQuery(
    session?.accessToken ?? null,
    isHydrated && Boolean(session?.accessToken)
  );
  const refreshMutation = useRefreshSessionMutation();

  useEffect(() => {
    hasTriedRefreshRef.current = false;
  }, [session?.accessToken]);

  useEffect(() => {
    if (!currentUserQuery.data?.user) {
      return;
    }

    dispatch(updateUser(currentUserQuery.data.user));
  }, [currentUserQuery.data, dispatch]);

  useEffect(() => {
    if (!currentUserQuery.error || !session?.refreshToken) {
      return;
    }

    if (
      !isApiError(currentUserQuery.error) ||
      currentUserQuery.error.status !== 401
    ) {
      return;
    }

    if (hasTriedRefreshRef.current || refreshMutation.isPending) {
      return;
    }

    hasTriedRefreshRef.current = true;
    refreshMutation.mutate(session.refreshToken);
  }, [currentUserQuery.error, refreshMutation, session?.refreshToken]);

  useEffect(() => {
    if (!refreshMutation.data) {
      return;
    }

    queryClient.setQueryData(
      authQueryKeys.currentUser(refreshMutation.data.accessToken),
      {
        user: refreshMutation.data.user,
      }
    );
    dispatch(setSession(refreshMutation.data));
  }, [dispatch, queryClient, refreshMutation.data]);

  useEffect(() => {
    if (!refreshMutation.error) {
      return;
    }

    dispatch(clearSession());
  }, [dispatch, refreshMutation.error]);
};

export function AuthBootstrap() {
  const isHydrated = useAppSelector(selectIsAuthHydrated);
  const session = useAppSelector(selectAuthSession);
  useHydrateStoredSession();
  usePersistStoredSession(isHydrated, session);
  useAuthSessionSync(isHydrated, session);

  return null;
}
