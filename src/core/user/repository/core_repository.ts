import { LoginResponse } from "@/core/user/repository/response/login_response.ts";
import { http } from "@/shared/api/http_helper.ts";
import { RegisterResponse } from "@/core/user/repository/response/register_response.ts";
import { AuthRequest } from "../provider/auth_provider";
import { UserResponse } from "./response/user_response";
import { ChangeAvatarResponse } from "./response/change_avatar_response";

class CoreRepository {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await http.post("/auth/login", {
        login: username,
        password: password,
      });
      if (response.status === 200) {
        return {
          token: response.data.token,
          userUUID: response.data.userUUID,
          error: null,
        };
      } else {
        return {
          token: null,
          userUUID: null,
          error: "Invalid credentials",
        };
      }
    } catch (e) {
      return {
        token: null,
        userUUID: null,
        error: "An unexpected error has occurred",
      };
    }
  }

  async register(values: AuthRequest): Promise<RegisterResponse> {
    try {
      const response = await http.post("/auth/register", {
        login: values.username,
        password: values.password,
        name: values.name,
        surname: values.surname,
        email: values.email,
        userType: "USER",
        avatar:
          "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",
      });
      if (response.status === 200) {
        return {
          login: response.data.login,
          userType: response.data.userType,
          error: null,
        };
      } else {
        return {
          login: null,
          userType: null,
          error: "Unable to register user",
        };
      }
    } catch (e) {
      return {
        login: null,
        userType: null,
        error: "An unexpected error has occurred",
      };
    }
  }

  async getAllUsers(): Promise<UsersListResponse> {
    try {
      const response = await http.get("/users/list");
      if (response.status === 200) {
        return {
          users: response.data.users,
          error: null,
        };
      } else {
        return {
          users: null,
          error: "An unexpected error has occurred",
        };
      }
    } catch (e) {
      return {
        users: null,
        error: "An unexpected error has occurred",
      };
    }
  }

  async getUserByUUID(userUUID: string): Promise<UserResponse> {
    try {
      const response = await http.get(`/users/getUserByUUID/${userUUID}`);
      if (response.status === 200) {
        return {
          user: response.data.user,
          error: null,
        };
      } else {
        return {
          user: null,
          error: "An unexpected error has occurred",
        };
      }
    } catch (e) {
      return {
        user: null,
        error: "An unexpected error has occurred",
      };
    }
  }

  async changeAvatar(
    userUUID: string,
    newAvatar: string
  ): Promise<ChangeAvatarResponse> {
    try {
      const response = await http.post("/users/changeAvatar", {
        userUUID,
        newAvatar,
      });
      if (response.status === 200) {
        return {
          changeAvatar: {
            userUUID,
            avatar: newAvatar,
          },
          error: null,
        };
      } else {
        return {
          changeAvatar: null,
          error: "An unexpected error has occurred",
        };
      }
    } catch (e) {
      return {
        changeAvatar: null,
        error: "An unexpected error has occurred",
      };
    }
  }
}

export const coreRepository = new CoreRepository();
