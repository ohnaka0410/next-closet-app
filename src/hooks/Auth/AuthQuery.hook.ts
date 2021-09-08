import type { MutateOptions } from "react-query";
import { useMutation } from "react-query";
import { supabase } from "~/libraries";

type AuthSignInMutationParams = {
  email: string;
  password: string;
};

type AuthSignInMutationResult = void;

export const useAuthSignInMutation = (
  options?: MutateOptions<AuthSignInMutationResult, Error, AuthSignInMutationParams>
) => {
  return useMutation(async ({ email, password }: AuthSignInMutationParams): Promise<AuthSignInMutationResult> => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error != null) {
      throw error;
    }
  }, options);
};

type AuthSignUpMutationParams = {
  email: string;
  password: string;
};

type AuthSignUpMutationResult = void;

export const useAuthSignUpMutation = (
  options?: MutateOptions<AuthSignUpMutationResult, Error, AuthSignUpMutationParams>
) => {
  return useMutation(async ({ email, password }: AuthSignUpMutationParams): Promise<AuthSignUpMutationResult> => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error != null) {
      throw error;
    }
  }, options);
};

type AuthSignOutMutationResult = void;

export const useAuthSignOutMutation = (options?: MutateOptions<AuthSignOutMutationResult, Error, void>) => {
  return useMutation(async (): Promise<AuthSignOutMutationResult> => {
    const { error } = await supabase.auth.signOut();
    if (error != null) {
      throw error;
    }
  }, options);
};

type AuthPasswordRecoveryMutationParams = {
  email: string;
};

type AuthPasswordRecoveryMutationResult = void;

export const useAuthPasswordRecoveryMutation = (
  options?: MutateOptions<AuthPasswordRecoveryMutationResult, Error, AuthPasswordRecoveryMutationParams>
) => {
  return useMutation(
    async ({ email }: AuthPasswordRecoveryMutationParams): Promise<AuthPasswordRecoveryMutationResult> => {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error != null) {
        throw error;
      }
    },
    options
  );
};

type AuthPasswordChangeMutationParams = {
  password: string;
};

type AuthPasswordChangeMutationResult = void;

export const useAuthPasswordChangeMutation = (
  options?: MutateOptions<AuthPasswordChangeMutationResult, Error, AuthPasswordChangeMutationParams>
) => {
  return useMutation(async (params: AuthPasswordChangeMutationParams): Promise<AuthPasswordChangeMutationResult> => {
    const { error } = await supabase.auth.update({
      ...params,
    });
    if (error != null) {
      throw error;
    }
  }, options);
};
