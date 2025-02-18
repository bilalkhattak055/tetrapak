export class ConfigDB {
  static data = {
    settings: {
      layout_type: 'ltr',
      sidebar: {
        type: 'compact-wrapper',
        iconType: 'stroke-svg',
      },
      sidebar_setting: 'default-sidebar',
      companyIcon: ''
    },
    color: {
      primary_color: localStorage.getItem('default_color') || '#1e67d6',
      secondary_color: localStorage.getItem('secondary_color') || '#f73164',
      mix_background_layout: 'light-only',
    },
    router_animation: 'fadeIn',
  };
}
export default ConfigDB;
