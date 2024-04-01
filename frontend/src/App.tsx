import React, { useState, useMemo } from "react";
import { JsonForms } from "@jsonforms/react";
import schema from "./schema.json";
import uischema from "./uischema.json";
import {
  vanillaCells,
  vanillaRenderers,
  JsonFormsStyleContext,
} from "@jsonforms/vanilla-renderers";
import { VanillaCells, VanillaRenderers } from "./index";
import { vanillaStyles } from "./styles/index";
// import styleContextValue from "./styles/Stylecontext";
// import { Properties } from "./interfaces/schema";
// const ajv=require("./Validation/ajv_valid");

const Ajv = require("ajv");
const ajv = new Ajv({ allerrors: true });

const renderers = [...vanillaRenderers, ...VanillaRenderers];
const cells = [...vanillaCells, ...VanillaCells];

const initialData = {
  name: "name",
  description: "enter about yourself",
  done: true,
  recurrence: "Daily",
  rating: 4,
};

const styleContextValue = {
  styles: [
    {
      name: "control",
      classNames: ["mb-3 font-mono fs-4"],
    },
    {
      name: "control.input",
      classNames: [
        "form-control rounded bg-light border border-secondary focus-border-primary fs-6 outline-0 text-dark py-3 px-4 transition-200 font-sans",
      ],
    },
    {
      name: "HorizontalLayout",
      classNames: [""],
    },
    {
      name: "control.validation",
      classNames: ["text-danger fw-normal mt-2 fs-4"],
    },
    {
      name: "control.label",
      classNames: ["fw-bold pb-4"],
    },
    {
      name: "control.select",
      classNames: [
        "form-select rounded bg-light border border-secondary focus-border-primary fs-6 outline-0 text-dark py-3 px-4 transition-200 appearance-none",
      ],
    },
    {
      name: "group.layout",
      classNames: ["accordion-item bg-white"],
    },
    {
      name: "control.slider",
      classNames: ["form-range", "custum-range", "border:0"],
    },
    {
      name: "group.label",
      classNames: [
        "accordion-button d-flex w-100 py-4 transition-none focus-outline-none text-uppercase fw-bold text-dark fs-5 pb-4",
      ],
    },
  ],
};

function App() {
  const [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const [submitrequired, setsubmitrequired] = useState(true);

  const [submitbuttontext, setsubmitbuttontext] = useState("login");

  const clearData = () => {
    const newdata = initialData;
    setData(newdata);
  };

  const submitbutton = () => {
    const validate = ajv.compile(schema);
    const valid = ajv.validate(data);
    if (!valid) console.log(validate.errors);
  };

  return (
    <div className="bg-gradient-to-r">
      <div className="rounded-t-lg overflow-hidden border-t border-l border-r border-gray-300 flex justify-center p-8">
        <div className="container">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-5">
            <section className="text-gray-700 body-font relative">
              <JsonFormsStyleContext.Provider value={{ styles: vanillaStyles }}>
                <JsonForms
                  schema={schema}
                  uischema={uischema}
                  data={data}
                  renderers={renderers}
                  cells={cells}
                  onChange={({ errors, data }) => {
                    setData(data);
                    console.table(data);
                  }}
                />
              </JsonFormsStyleContext.Provider>

              {submitbuttontext && (
                <button
                  className="btn btn-secondary m-3"
                  onClick={submitbutton}
                  hidden={!submitrequired}
                >
                  {submitbuttontext}
                </button>
              )}

              {
                <button
                  className="btn btn-secondary"
                  onClick={clearData}
                  hidden={initialData === data ? true : false}
                >
                  Clear
                </button>
              }
            </section>
            <div>{JSON.stringify(data)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
