class HighSchoolModel {
  constructor(id, name, address, establishedDate, phone, teachers, shortDescription, isDeleted) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.establishedDate = establishedDate;
    this.phone = phone;
    this.teachers = teachers;
    this.shortDescription = shortDescription;
    this.isDeleted = isDeleted || false;
  }

  fromFirestore(doc) {
    if (!doc.exists) return null;
    const data = doc.data();
    return new HighSchoolModel(
      doc.id,
      data.name,
      data.address,
      data.establishedDate,
      data.phone,
      data.teachers,
      data.shortDescription,
      data.isDeleted
    );
  }

  toFirestore() {
    return {
      name: this.name,
      address: this.address,
      establishedDate: this.establishedDate,
      phone: this.phone,
      teachers: this.teachers,
      shortDescription: this.shortDescription,
      isDeleted: this.isDeleted
    };
  }
}

module.exports = HighSchoolModel;
