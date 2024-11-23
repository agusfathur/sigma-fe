export type SettingApp = {
  id_app_setting: string;
  nama_sistem: string;
  singkatan_sistem: string;
  logo_sistem: string;
  deskripsi_sistem: string;
  developer: string;
  author: string;
};

export type SettingAppUpdate = {
  id_app_setting: string;
  nama_sistem: string;
  singkatan_sistem: string;
  logo_sistem?: File;
  deskripsi_sistem: string;
  developer: string;
  author: string;
};
