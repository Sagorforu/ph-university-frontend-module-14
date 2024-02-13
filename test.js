const adminPaths = [
  {
    name: "dashboard",
    path: "dashboard",
    element: "ADMIN_DASHBOARD",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CREATEADMIN",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CREATEFACULTY",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "CREATESTUDENT",
      },
    ],
  },
];

const adminRoutes = adminPaths.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: "NAVLINK",
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: "NAVLINK",
      })),
    });
  }

  return acc;
}, []);
console.log(JSON.stringify(adminRoutes));
