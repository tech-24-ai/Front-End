export const connectFormFieldsVendor = [
  {
    name: "yourName",
    lable: "Provide your name",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "organisationName",
    lable: "Provide the name of your organisation",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "yourEmail",
    lable: "Provide your email",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "yourContact",
    lable: "Provide your contact",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "website",
    lable: "Company Website",
    type: "text",
    value: "",
    placeholder: "",
    validation: "min:1",
  },
  {
    name: "revenueRange",
    lable: "Company Revenue Range in US$",
    type: "text",
    value: "",
    placeholder: "",
    validation: "min:1",
  },
  {
    name: "companyAddress",
    lable: "Company address",
    type: "textarea",
    value: "",
    placeholder: "",
    validation: "min:1",
  },
  {
    name: "domainExpertise",
    lable: "Domain Expertise",
    type: "textarea",
    value: "",
    placeholder: "",
    validation: "min:1",
  },
  {
    name: "numberEmployees",
    lable: "Number of Employees",
    type: "select",
    value: "",
    placeholder: "",
    validation: "required",
    options: [
      {
        value: "1-10",
        label: "1 - 10",
      },
      {
        value: "10-50",
        label: "10 - 50",
      },
      {
        value: "50-100",
        label: "50 - 100",
      },
      {
        value: "100-250",
        label: "100 - 250",
      },
      {
        value: "250-1000",
        label: "250 - 1000",
      },
      {
        value: "1000-5000",
        label: "1000 - 5000",
      },
      {
        value: ">5000",
        label: "> 5000",
      },
    ],
  },
];

export const connectFormFieldsConsulting = [
  {
    name: "yourName",
    lable: "Provide your name",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "organisationName",
    lable: "Provide the name of the organisation",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "yourEmail",
    lable: "Provide your email",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "yourContact",
    lable: "Provide your contact",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "requirement",
    lable: "What are your requirements?",
    type: "textarea",
    value: "",
    placeholder: "",
    validation: "required",
  },
];

export const connectFormFieldsConsultant = [
  {
    name: "firstName",
    lable: "Name",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },

  {
    name: "email",
    lable: "Email Address",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "mobile",
    lable: "Mobile Number",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },

  {
    name: "linkedInUrl",
    lable: "LinkedIn URL",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "years_of_experience",
    lable: "Years of Experience",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "location",
    lable: "Location",
    type: "select",
    value: "",
    placeholder: "Select country",
    validation: "required",
    url: "location",
  },
  {
    name: "skills",
    lable: "Skills",
    type: "treeselect",
    value: "",
    placeholder: "",
    url: "skills?withChildren=true",
    validation: "min:1",
  },
];

export const connectFormFieldsServiceProvider = [
  {
    name: "firstName",
    lable: "Company Name",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "email",
    lable: "Email",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "mobile",
    lable: "Contact Number",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "website",
    lable: "Website",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "linkedInUrl",
    lable: "LinkedIn URL",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "number_of_employee",
    lable: "Number of Employees",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "name_of_company_representative",
    lable: "Name of company representative",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "location",
    lable: "Location",
    type: "select",
    value: "",
    placeholder: "Select country",
    validation: "required",
    url: "location",
  },
  {
    name: "skills",
    lable: "Skills",
    type: "treeselect",
    value: "",
    placeholder: "",
    url: "skills?withChildren=true",
    validation: "min:1",
  },
];
export const connectFormFieldsCorrection = [
  {
    name: "yourName",
    lable: "Provide your name",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "organisationName",
    lable: "Provide the name of your organisation",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "yourEmail",
    lable: "Provide your email",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "yourContact",
    lable: "Provide your contact",
    type: "text",
    value: "",
    placeholder: "",
    validation: "required",
  },
  {
    name: "corrections",
    lable: "Please provide details of corrections that are required",
    type: "textarea",
    value: "",
    placeholder: "",
    validation: "min:1",
  },
];
