import { find } from 'lodash';
import { getUserRolePermission } from 'src/contents/login/LoginAuthentication';

const API_KEY = 'AIzaSyDrm8YAhWY9GC9Enk7b9YFa5DC4DQeTokE';
const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`;

const MAP_SETTINGS = {
  DEFAULT_MAP_OPTIONS: {
    scrollwheel: true,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false
  },
  DEFAULT_CENTER: { lat: 8.091099696396785, lng: 80.65820702764951 },
  DEFAULT_ZOOM: 5,
  MARKER_SIZE: 25,
  PIXEL_OFFSET: {
    MARKER: {
      X: 0,
      Y: -35
    }
  },
  DIRECTIONS_OPTIONS: { suppressMarkers: true, preserveViewport: true }
};

const whiteList = ['/', '/forgot-password'];

const userRoles = {
  THADMIN: 'THADMIN',
  COMPANYADMIN: 'COMPANYADMIN',
  COMPANYBRANCHADMIN: 'COMPANYBRANCHADMIN',
  DRIVER: 'DRIVER',
  PASSENGER: 'PASSENGER'
};

const setImageUrl = (value) => {
  localStorage.setItem('imageUrl', value);
};
const getImageUrl = () => {
  let userData = localStorage.getItem('imageUrl');
  return userData;
};

const PERMISSION = [
  {
    type: 'NONE',
    permission: {
      add: false,
      edit: false,
      delete: false,
      view: false,
      action: false
    }
  },
  {
    type: 'READ',
    permission: {
      add: false,
      edit: false,
      delete: false,
      view: true,
      action: false
    }
  },
  {
    type: 'WRITE',
    permission: {
      add: true,
      edit: true,
      delete: false,
      view: true,
      action: true
    }
  },
  {
    type: 'MAINTAIN',
    permission: {
      add: true,
      edit: true,
      delete: true,
      view: true,
      action: true
    }
  }
];

const permissionData = [
  {
    name: 'License',
    id: 1,
    active: true,
    permissionType: 'MAINTAIN'
  },
  {
    name: 'Company',
    id: 2,
    active: true,
    permissionType: 'READ'
  },
  {
    name: 'Company Branch',
    id: 3,
    active: true,
    permissionType: 'MAINTAIN'
  },
  {
    name: 'GPS-Tracker',
    id: 4,
    active: true,
    permissionType: 'READ'
  },
  {
    name: 'Vehicle',
    id: 5,
    active: true,
    permissionType: 'WRITE'
  },
  {
    name: 'Driver',
    id: 6,
    active: true,
    permissionType: 'READ'
  },
  {
    name: 'Route',
    id: 7,
    active: true,
    permissionType: 'READ'
  },
  {
    name: 'Passenger',
    id: 8,
    active: true,
    permissionType: 'READ'
  },
  {
    name: 'Driver Allocation',
    id: 9,
    active: true,
    permissionType: 'READ'
  },
  {
    name: 'Route Allocation',
    id: 10,
    active: true,
    permissionType: 'READ'
  },
  {
    name: 'Role Permission',
    id: 11,
    active: true,
    permissionType: 'READ'
  }
];

const PERMISSION_NAME = {
  dashboard: 'dashboard',
  employee: 'employee',
  approver: 'approver',
  ehistory: 'e-history',
  leavetype: 'leavetype',
  history: 'history',

  allocateLeaves: 'allocateLeaves',
  holiday: 'holiday',
  notification: 'notification',
  user: 'user',
  role: 'role',
  user_role: 'user role',
  role_permission: 'role permission'
};
const modulePermissionType = (moduleName) => {
  let permissionData = getUserRolePermission();
  let permission = find(permissionData, (res) => res.name === moduleName);
  return permission && permission.active ? permission.permissionType : 'NONE';
};

const modulePermission = (moduleName) => {
  let permissionType = modulePermissionType(moduleName);
  let permission = find(
    PERMISSION,
    (res) => res.type === permissionType
  ).permission;
  return permission;
};

const notificationData = [
  {
    id: 1,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '5 min ago',
    read: false,
    date: '2022-02-23'
  },
  {
    id: 2,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '3 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 3,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '10 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 4,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '5 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 5,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 6,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 7,
    name: 'Creation',
    meassage: 'Company admin created By Romipraveen.',
    time: '5 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 8,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '3 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 9,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '10 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 10,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '5 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 11,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 12,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 13,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '5 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 14,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '3 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 15,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '10 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 16,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '5 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 17,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 18,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 19,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '5 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 20,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '3 min ago',
    read: false,
    date: '2022-02-23'
  },
  {
    id: 21,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '10 min ago',
    read: false,
    date: '2022-02-23'
  },
  {
    id: 22,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '5 min ago',
    read: false,
    date: '2022-02-23'
  },
  {
    id: 23,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: true,
    date: '2022-02-23'
  },
  {
    id: 24,
    name: 'Creation',
    meassage: 'Company admin created.',
    time: '20 min ago',
    read: false,
    date: '2022-02-23'
  }
];

const genderItems = [
  { id: 'Male', title: 'Male' },
  { id: 'Female', title: 'Female' }
];

const provinceItems = [
  {
    id: 'Central Province',
    title: 'Central Province'
  },
  {
    id: 'Eastern Province',
    title: 'Eastern Province'
  },
  {
    id: 'North Central Province',
    title: 'North Central Province'
  },
  {
    id: 'North Western Province',
    title: 'North Western Province'
  },
  {
    id: 'Northern Province',
    title: 'Northern Province'
  },
  {
    id: 'Sabaragamuwa Province',
    title: 'Sabaragamuwa Province'
  },
  {
    id: 'Southern Province',
    title: 'Southern Province'
  },
  {
    id: 'Uva Province',
    title: 'Uva Province'
  },
  {
    id: 'Western Province',
    title: 'Western Province'
  }
];
const PROVINCE = [
  {
    id: 'Central Province',
    title: 'Central Province'
  },
  {
    id: 'Eastern Province',
    title: 'Eastern Province'
  },
  {
    id: 'North Central Province',
    title: 'North Central Province'
  },
  {
    id: 'North Western Province',
    title: 'North Western Province'
  },
  {
    id: 'Northern Province',
    title: 'Northern Province'
  },
  {
    id: 'Sabaragamuwa Province',
    title: 'Sabaragamuwa Province'
  },
  {
    id: 'Southern Province',
    title: 'Southern Province'
  },
  {
    id: 'Uva Province',
    title: 'Uva Province'
  },
  {
    id: 'Western Province',
    title: 'Western Province'
  }
];

const DISTRICTS = [
  {
    id: 'Basnahira Palata',
    title: 'Basnahira Palata'
  },
  {
    id: 'Colombo',
    title: 'Colombo'
  },
  {
    id: 'Gampaha',
    title: 'Gampaha'
  },
  {
    id: 'Kalutara',
    title: 'Kalutara'
  },
  {
    id: 'Madhyama Palata',
    title: 'Madhyama Palata'
  },
  {
    id: 'Kandy',
    title: 'Kandy'
  },
  {
    id: 'Matale',
    title: 'Matale'
  },
  {
    id: 'Nuwara Eliya',
    title: 'Nuwara Eliya'
  },
  {
    id: 'Dakunu Palata',
    title: 'Dakunu Palata'
  },
  {
    id: 'Galle',
    title: 'Galle'
  },
  {
    id: 'Matara',
    title: 'Matara'
  },
  {
    id: 'Hambantota',
    title: 'Hambantota'
  },
  {
    id: 'Uturu Palata',
    title: 'Uturu Palata'
  },
  {
    id: 'Jaffna',
    title: 'Jaffna'
  },
  {
    id: 'Kilinochchi',
    title: 'Kilinochchi'
  },
  {
    id: 'Mannar',
    name: 'Mannar'
  },
  {
    id: 'Vavuniya',
    title: 'Vavuniya'
  },
  {
    id: 'Mullaittivu',
    title: 'Mullaittivu'
  },
  {
    id: 'Batticaloa',
    title: 'Batticaloa'
  },
  {
    id: 'Ampara',
    title: 'Ampara'
  },
  {
    id: 'Trincomalee',
    title: 'Trincomalee'
  },
  {
    id: 'Vayamba Palata',
    title: 'Vayamba Palata'
  },
  {
    id: 'Kurunegala',
    title: 'Kurunegala'
  },
  {
    id: 'Puttalam',
    title: 'Puttalam'
  },
  {
    id: 'Anuradhapura',
    title: 'Anuradhapura'
  },
  {
    id: 'Polonnaruwa',
    title: 'Polonnaruwa'
  },
  {
    id: 'Uva Palata',
    title: 'Uva Palata'
  },
  {
    id: 'Badulla',
    title: 'Badulla'
  },
  {
    id: 'Monaragala',
    title: 'Monaragala'
  },
  {
    id: 'Sabaragamuva Palata',
    title: 'Sabaragamuva Palata'
  },
  {
    id: 'Ratnapura',
    title: 'Ratnapura'
  },
  {
    id: 'Kegalla',
    title: 'Kegalla'
  }
];


const proviceAndDistrics = [
  {
    id: 'Central Province',
    title: 'Central Province',
    code: 'LK-2',
    district: [
      {
        id: 'Kandy',
        title: 'Kandy',
      },
      {
        id: 'Matale',
        title: 'Matale',
      },
      {
        id: 'Nuwara Eliya',
        title: 'Nuwara Eliya',
      },
    ],
  },
  {
    id: 'Eastern Province',
    title: 'Eastern Province',
    code: 'LK-5',
    district: [
      {
        id: 'Ampara',
        title: 'Ampara',
      },
      {
        id: 'Batticaloa',
        title: 'Batticaloa',
      },
      {
        id: 'Trincomalee',
        title: 'Trincomalee',
      },
    ],
  },
  {
    id: 'North Central Province',
    title: 'North Central Province',
    code: 'LK-7',
    district: [
      {
        id: 'Polonnaruwa',
        title: 'Polonnaruwa',
      },
      {
        id: 'Anuradhapura',
        title: 'Anuradhapura',
      },
    ],
  },
  {
    id: 'North Western Province',
    title: 'North Western Province',
    code: 'LK-6',
    district: [
      {
        id: 'Kurunegala',
        title: 'Kurunegala',
      },
      {
        id: 'Puttalam',
        title: 'Puttalam',
      },
    ],
  },
  {
    id: 'Northern Province',
    title: 'Northern Province',
    code: 'LK-4',
    district: [
      {
        id: 'Vavuniya',
        title: 'Vavuniya',
      },
      {
        id: 'Mullaitivu',
        title: 'Mullaitivu',
      },
      {
        id: 'Mannar',
        title: 'Mannar',
      },
      {
        id: 'Kilinochchi',
        title: 'Kilinochchi',
      },
      {
        id: 'Jaffna',
        title: 'Jaffna',
      },
    ],
  },
  {
    id: 'Sabaragamuwa Province',
    title: 'Sabaragamuwa Province',
    code: 'LK-9',
    district: [
      {
        id: 'Kegalle',
        title: 'Kegalle',
      },
      {
        id: 'Ratnapura',
        title: 'Ratnapura',
      },
    ],
  },
  {
    id: 'Southern Province',
    title: 'Southern Province',
    code: 'LK-3',
    district: [
      {
        id: 'Matara',
        title: 'Matara',
      },
      {
        id: 'Hambantota',
        title: 'Hambantota',
      },
      {
        id: 'Galle',
        title: 'Galle',
      },
    ],
  },
  {
    id: 'Uva Province',
    title: 'Uva Province',
    code: 'LK-8',
    district: [
      {
        id: 'Badulla',
        title: 'Badulla',
      },
      {
        id: 'Moneragala',
        title: 'Moneragala',
      },
    ],
  },
  {
    id: 'Western Province',
    title: 'Western Province',
    code: 'LK-1',
    district: [
      {
        id: 'Kalutara',
        title: 'Kalutara',
      },
      {
        id: 'Gampaha',
        title: 'Gampaha',
      },
      {
        id: 'Colombo',
        title: 'Colombo',
      },
    ],
  },
];


export {
  GOOGLE_MAP_URL,
  MAP_SETTINGS,
  API_KEY,
  setImageUrl,
  getImageUrl,
  PERMISSION,
  modulePermission,
  PERMISSION_NAME,
  permissionData,
  modulePermissionType,
  userRoles,
  notificationData,
  genderItems,
  provinceItems,
  PROVINCE,
  DISTRICTS,
  proviceAndDistrics
};
