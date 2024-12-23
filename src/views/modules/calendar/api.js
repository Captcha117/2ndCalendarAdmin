import request from "@/utils/request";

export default {
  changeTenant(data) {
    return request({
      url: "/user/switchTenant",
      method: "post",
      data,
    });
  },
  getGameList() {
    return request({
      url: `/calendar/game/gameList`,
      method: "get",
    });
  },
  getPlatformList() {
    return request({
      url: `/calendar/platform/platformList`,
      method: "get",
    });
  },
  getCategoryList(gameId) {
    return request({
      url: `/calendar/category/categoryList?gameId=` + gameId,
      method: "get",
    });
  },
  saveEvent(data) {
    return request({
      url: `/calendar/event/save`,
      method: "post",
      data,
    });
  },
};
