import type { User, AuthTokens } from "@/types";

const MOCK_STORAGE_KEY = "m2i_mock_users";

// Default mock users matching the demo credentials
const defaultUsers: User[] = [
  {
    id: "mock-super-admin-1",
    name: "Super Admin",
    email: "superadmin@m2i.com",
    role: "SUPER_ADMIN",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-admin-1",
    name: "M2I Admin",
    email: "admin@m2i.com",
    role: "M2I_ADMIN",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-college-admin-1",
    name: "College Admin",
    email: "collegeadmin@m2i.com",
    role: "COLLEGE_ADMIN",
    collegeId: "mock-college-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-mentor-1",
    name: "Dr. Rajesh Kumar (Mentor)",
    email: "mentor@m2i.com",
    role: "MENTOR",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-student-1",
    name: "Amit Sharma (Student)",
    email: "student@m2i.com",
    role: "STUDENT",
    collegeId: "mock-college-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-company-1",
    name: "Acme Corp Recruiter",
    email: "recruiter@company.com",
    role: "COMPANY",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// In a real app we'd hash passwords, but for mock purposes we just store them here.
const MOCK_PASSWORDS: Record<string, string> = {
  "superadmin@m2i.com": "Super@123",
  "admin@m2i.com": "Admin@123",
  "collegeadmin@m2i.com": "College@123",
  "student@m2i.com": "Student@123",
  "mentor@m2i.com": "Mentor@123",
  "recruiter@company.com": "Company@123",
};

interface StoredMockUser extends User {
  password?: string;
}

const getStoredUsers = (): StoredMockUser[] => {
  if (typeof window === "undefined") return defaultUsers;
  
  try {
    const stored = window.localStorage.getItem(MOCK_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to read mock users from storage", error);
  }
  
  // Initialize storage if empty
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(defaultUsers));
  }
  return defaultUsers;
};

const saveUsers = (users: StoredMockUser[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(users));
  }
};

export const mockAuth = {
  login: async (email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = getStoredUsers();
    const user = users.find((u) => u.email === email);

    // Check if it's a default user with "password" or a registered user with their password
    const isDefaultPassword = MOCK_PASSWORDS[email] === password;
    const isStoredPassword = user?.password === password;

    if (!user || (!isDefaultPassword && !isStoredPassword)) {
      throw new Error("Invalid email or password");
    }

    // Strip out the mock password before returning the user object
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens: {
        accessToken: `mock-jwt-token-${user.id}-${Date.now()}`,
        refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`,
      },
    };
  },

  register: async (data: Partial<User> & { password: string }): Promise<{ user: User; tokens: AuthTokens }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = getStoredUsers();
    if (users.some((u) => u.email === data.email)) {
      throw new Error("User with this email already exists");
    }

    const newUser: StoredMockUser = {
      id: `mock-user-${Date.now()}`,
      name: data.name || "New User",
      email: data.email!,
      role: "STUDENT", // Default to student for self-registration per BRD, pending role assignment ideally, but keeping it simple
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      password: data.password,
    };

    saveUsers([...users, newUser]);

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      tokens: {
        accessToken: `mock-jwt-token-${newUser.id}-${Date.now()}`,
        refreshToken: `mock-refresh-token-${newUser.id}-${Date.now()}`,
      },
    };
  },
};
