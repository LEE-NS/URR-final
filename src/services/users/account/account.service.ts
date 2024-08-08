import { createClient } from "../../../../supabase/client";
import { AddressProps } from "../../../../types/addr.type";
import { editUserData } from "../../../../types/auth.type";
import { v4 as uuidv4 } from "uuid";

export const patchUserFromUserId = async (editUserData: editUserData) => {
  console.log(editUserData);
  const { id } = editUserData;
  const res = await fetch(`/api/auth/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editUserData)
  });
  if (!res.ok) {
    alert("요청이 정상적으로 수행되지 못했습니다.");
    return;
  }

  return res.json();
};

export const getAddress = async (addressProps: AddressProps) => {
  const { keyword, currentPage } = addressProps;
  const res = await fetch(`/api/auth/users/edit/address/${keyword}/${currentPage}`);
  const data = await res.json();
  return data;
};

export const uploadProfile = async ({ profileData }: { profileData: { file: File; userId: string } }) => {
  const supabase = createClient();

  const { file, userId } = profileData;
  console.log("service : ", file);

  const ext = file.type.split("/").pop();

  const { data, error } = await supabase.storage.from("profile").upload(`${userId}/${uuidv4()}.${ext}`, file);

  if (error) {
    console.log(error);
  }

  console.log(data);
  return data;
};

export const getProfile = async (params: { userId: string; filePath: string }) => {
  const supabase = createClient();
  const { userId, filePath } = params;
  const { data } = supabase.storage.from(`profile`).getPublicUrl(`${filePath}`);
  console.log(data);
  if (!data) {
    console.log("이미지 URL을 받아오지 못했습니다");
  }
  return data.publicUrl;
};

export const sendResetPasswordEmail = async (email: string) => {
  const supabase = createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/mypage/edit/updatepw"
  });
};

export const updateUserPassword = async (password: string) => {
  const supabase = createClient();
  const res = await supabase.auth.updateUser({ password });
  console.log(res);
  return res;
};
