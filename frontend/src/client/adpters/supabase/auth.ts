import supabase from "../../lib/supabase";
import { PUBLIC_ORIGIN_URL } from "$env/static/public";

class AuthAdapter {
  origin_url = PUBLIC_ORIGIN_URL;
  createAccount = async ({ email, password, full_name }) => {
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: full_name,
        },
      },
    });
    if (error) throw Error(error.message);
    return data;
  };
  signIn = async ({ email, password }: any) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw Error(error.message);
    return data;
  };
  signWithGoogle = async ({ redirect }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: this.origin_url + redirect,
      },
    });
    if (error) throw Error(error.message);
    return data;
  };
  onAuthChange(callback) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((e, session) => {
      return callback(session ? this.format(session.user) : undefined);
    });
    return subscription;
  }
  format(user) {
    const meta = user?.user_metadata;
    return {
      email: user.email,
      id: user.id,
      phone: user.phone || "",
      username: meta?.full_name || "Unknown Name",
      created_at: user.created_at,
      photo: meta?.picture || "",
    };
  }

  getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    const { session } = data;
    if (error) throw Error(error.message);
    return session?.user ? this.format(session.user) : null;
  };

  currentUserChanged = (callback) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      return callback(user ? this.format(user) : null);
    });
  };

  reload = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    const { session } = data;
    console.log(session);
    if (error) throw Error(error.message);
    return session?.user ? this.format(session.user) : null;
  };

  forgotPassword = async ({ email }) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: this.origin_url + "/?open_modal=reset_password",
    });
    if (error) throw Error(error.message);
    return data;
  };
  resetPassword = async ({ password }) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) throw Error(error.message);
    return data;
  };
  changePassword = async ({ password }) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) throw Error(error.message);
    return data;
  };
  updateProfile = async ({ ...profile }) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { ...profile },
    });
    if (error) throw Error(error.message);
    return data;
  };
  logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw Error(error.message);
    return null;
  };
}

export default AuthAdapter;
