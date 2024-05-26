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

  async logout() {
    try {
      await http.post("/auth/logout");
    } catch (e) {
      throw e;
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
        avatar: "",
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
