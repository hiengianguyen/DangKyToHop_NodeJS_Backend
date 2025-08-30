const { FirestoreModel, HighSchoolModel, ImageActivityModel } = require("../models");
const { CollectionNameConstant } = require("../../constants");

class SchoolController {
  constructor() {
    this.highSchoolDbRef = new FirestoreModel(CollectionNameConstant.HighSchools, HighSchoolModel);
    this.imageActivityDbRef = new FirestoreModel(CollectionNameConstant.ImageActivity, ImageActivityModel);
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    let [highSchool, imgStudentDancings, imgStudentCampings, imgStudentActivitys, imgStudentAchievements, imgSchool] = await Promise.all([
      this.highSchoolDbRef.getItemByFilter({
        name: "Trường THPT Duy Tân"
      }),
      this.imageActivityDbRef.getItemsByFilter({
        type: "dance"
      }),
      this.imageActivityDbRef.getItemsByFilter({
        type: "camp"
      }),
      this.imageActivityDbRef.getItemsByFilter({
        type: "activity"
      }),
      this.imageActivityDbRef.getItemsByFilter({
        type: "achievement"
      }),
      this.imageActivityDbRef.getItemsByFilter({
        type: "school"
      })
    ]);

    const studentAchievementsSorted = imgStudentAchievements.sort((a, b) => {
      const stringNumberFirstA = a.imgUrl.split("cap_tinh_")[1];
      const stringNumberFirstB = b.imgUrl.split("cap_tinh_")[1];

      return parseInt(stringNumberFirstA) - parseInt(stringNumberFirstB);
    });

    return res.json({
      studentAchievements: studentAchievementsSorted,
      imgStudentDancings: imgStudentDancings,
      imgStudentCampings: imgStudentCampings,
      imgSchool: imgSchool,
      imgStudentActivitys: imgStudentActivitys,
      highSchool: highSchool
    });
  }

  async contact(req, res, next) {
    if (req?.cookies?.isLogin === "true" && req?.cookies?.userId) {
      return res.render("school/contact");
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = new SchoolController();
