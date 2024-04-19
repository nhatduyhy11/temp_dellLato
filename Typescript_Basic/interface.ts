interface Class {
  name: string;
  address?: string;
}

interface Student {
  name: string;
  year: number;
  university?: string;
  class: Class;
}

const student_01: Student = {
  name: "Nam",
  year: 1,
  university: "DH Quoc Gia",
  class: {
    name: "CNTT",
    address: "Phong 20",
  },
};

const student_02: Student = {
  name: "Chuối",
  year: 2,
  university: "DH Quoc Gia HCM",
  class: {
    name: "CNTT_CLC",
    address: "Phong 21",
  },
};

const student_03: Student = {
  name: "Bưởi",
  year: 1.5,
  class: {
    name: "CNTT_TV",
  },
};
