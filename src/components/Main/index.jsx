import { IoMdMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import Dropdownweight from "../dropdown/idex1";
import Dropdownheight from "../dropdown";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Chartcomponent } from "../chart";

export const Main = () => {
  const { register, handleSubmit } = useForm();
  const [heightUnit, setHeightUnit] = useState("cm"); // Default unit is cm
  const [weightUnit, setWeightUnit] = useState("Kg");
  const [activeGender, setActiveGender] = useState(""); // State to track active gender
  const [bmi, setBmi] = useState("");
  const [bmiprime, setBmiprime] = useState("");
  const [PI, setPI] = useState("");
  const [data, setData] = useState("");
  const [theme, setTheme] = useState(false);
  const handleDropdownselect = (unit) => {
    setHeightUnit(unit);
  };

  const handleWeight = (unit) => {
    setWeightUnit(unit);
  };

  const onSubmit = (data) => {
    console.log("Submitted", data);

    const weight = data.weight;
    const height = data.height;
    const age = data.age;

    let heightMeters, weightKg;

    if (heightUnit === "cm") {
      // Height is in centimeters, no conversion needed
      heightMeters = height / 100; // Convert height to meters
    } else {
      // Height is in feet and inches, convert to centimeters
      const [feet] = height.split(" ");
      const totalInches = parseInt(feet) * 12;
      heightMeters = totalInches * 0.0254; // Convert height to meters
    }

    if (weightUnit === "Kg") {
      // Weight is in kilograms, no conversion needed
      weightKg = weight;
    } else {
      // Weight is in pounds, convert to kilograms
      weightKg = weight * 0.453592; // Convert weight to kilograms
    }

    // Calculate BMI
    const bmi = weightKg / (heightMeters * heightMeters);

    setBmi(bmi.toFixed(2)); // Round BMI to 2 decimal places
    console.log("the user bmi is", bmi);
    console.log("the user age is", age);

    const bmiprime = bmi / 25;
    setBmiprime(bmiprime.toFixed(2));

    const PI = weightKg / (heightMeters * heightMeters * heightMeters);
    setPI(PI.toFixed(2));

    let message;
    if (bmi < 18.5) {
      message =
        "A BMI less than 18.5 is considered underweight. Benefits of maintaining a healthy weight include improved energy levels, better sleep, and reduced risk of certain diseases.";
    } else if (bmi >= 18.5 && bmi < 25) {
      message =
        "A BMI between 18.5 and 25 is considered normal weight. Maintaining a normal weight reduces the risk of chronic diseases and promotes overall well-being.";
    } else if (bmi >= 25 && bmi < 30) {
      message =
        "A BMI between 25 and 30 is considered overweight.Losing weight through healthy lifestyle changes can reduce the risk of obesity-related health issues such as heart disease and type 2 diabetes.";
    } else {
      message =
        "A BMI greater than or equal to 30 is considered obese.Obesity increases the risk of various health problems, including heart disease, stroke, type 2 diabetes, and certain types of cancer.";
    }

    setData({ message });
  };

  const darkandlight = () => {
    setTheme(!theme);
    console.log(theme);
  };
  return (
    <div className={`${theme && "dark"}`}>
      <div className="h-screen w-screen flex justify-center items-center bg-white dark:bg-[#04060A] ">
        <div className="bg-[#F8F5F2] w-full max-w-7xl p-5 rounded-xl flex dark:bg-[#27272C]">
          <div className="flex flex-col gap-4 flex-1 w-full max-w-md">
            <div>
              <span className="text-xs font-medium">Fitness&health</span>
            </div>

            <div className="flex flex-col gap-5 w-full p-7">
              <span className="text-3xl font-custom font-medium ">
                BMI Calculator
              </span>
              <span className="text-sm font-custom  text-slate-700 dark:text-white">
                Enter the values and click the calculate button to get the
                results.
              </span>
              <div className="flex flex-col">
                <label className="font-custom text-xs font-semibold text-slate-700 dark:text-white  ">
                  Gender
                </label>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setActiveGender("Female"); // Set active gender to Female
                    }}
                    className={`flex items-center h-10 w-48 bg-white rounded-lg justify-center hover:cursor-pointer border border-gray-300 focus:border-slate-500 focus:outline-none ${
                      activeGender === "Female" && "bg-slate-400" // Conditional class for active state
                    }`}
                  >
                    <IoFemale />
                    <span className="ml-2">Female</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveGender("Male"); // Set active gender to Male
                    }}
                    className={`flex items-center h-10 w-48 bg-white rounded-lg justify-center hover:cursor-pointer border border-gray-300 focus:border-slate-500 focus:outline-none ${
                      activeGender === "Male" && "bg-slate-400" // Conditional class for active state
                    }`}
                  >
                    <IoMdMale />
                    <span className="ml-2">Male</span>
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col justify-between w-full">
                    <label className="font-custom text-xs font-semibold text-slate-700 dark:text-white ">
                      Age
                    </label>
                    <input
                      {...register("age")}
                      type="text"
                      placeholder="Enter age.."
                      className="h-9 rounded-lg border border-slate-300 pl-2 placeholder-slate-500 text-xs font-semibold dark:bg-[#40404A]  dark:placeholder-white dark:border-none"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <label className="font-custom text-xs font-semibold text-slate-700 dark:text-white ">
                      Height
                    </label>
                    <div className="flex justify-between w-full gap-3">
                      <input
                        {...register("height")}
                        type="text"
                        placeholder={`Enter Height In ${heightUnit} `}
                        className="rounded-lg border border-slate-300 placeholder-slate-500 pl-2 w-full text-xs font-semibold  dark:bg-[#40404A] dark:placeholder-white dark:border-none"
                      />
                      <Dropdownheight onSelect={handleDropdownselect} />
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <label className="font-custom text-xs font-semibold text-slate-700 dark:text-white ">
                      Weight
                    </label>
                    <div className="flex justify-between w-full gap-3">
                      <input
                        {...register("weight")}
                        type="number"
                        placeholder={`Enter Weight In ${weightUnit} `}
                        className="rounded-lg border border-slate-300 placeholder-slate-500  text-xs font-semibold pl-2 w-full  dark:bg-[#40404A] dark:placeholder-white dark:border-none"
                      />
                      <Dropdownweight onSelect={handleWeight} />
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#ff6f61] text-white  w-full  h-12 rounded-lg dark:bg-[#944BBB]">
                      Calculate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-1 bg-white shadow-2xl  w-full rounded-2xl dark:bg-[#1E1B18] ">
            <div className="flex flex-col w-full p-11 ">
              <span className="font-custom text-sm font-semibold pb-2 text-slate-800">
                Your results
              </span>
              <span className="w-full border border-slate-200 rounded-lg"></span>
              <div>
                <span className="font-medium text-slate-500 text-sm ">
                  {data.message}
                </span>
              </div>
              <div className="flex justify-center relative">
                <Chartcomponent className="flex justify-center " />
                <div className="font-custom text-slate-800 font-semibold text-sm flex justify-center items-center absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="font-custom font-medium text-2xl">BMI=</span>
                  <span className="font-custom font-medium text-2xl">
                    {bmi}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pb-6 ">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                  <span className="font-custom text-xs text-slate-700 font-medium">
                    underweight
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#059669] rounded-full"></span>
                  <span className="font-custom text-xs text-slate-700 font-medium">
                    normal weight
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-300 rounded-full"></span>
                  <span className="font-custom text-xs text-slate-700 font-medium">
                    overweight
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
                  <span className="font-custom text-xs text-slate-700 font-medium">
                    obese
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-custom text-slate-700 font-semibold text-xs">
                  Healthy BMI range:
                  <span className="font-medium text-slate-600 pl-2">
                    18.5 kg/m2 - 25 kg/m2
                  </span>
                </span>
                <span className="font-custom text-slate-700 font-semibold text-xs">
                  Healthy weight for the height:
                </span>
                <span className="font-custom text-slate-700 font-semibold text-xs">
                  BMI prime:
                  <span className="font-medium text-slate-600 pl-2">
                    {bmiprime}
                  </span>
                </span>
                <span className="font-custom text-slate-700 font-semibold text-xs">
                  Ponderal index:
                  <span className="font-medium text-slate-600 pl-2">
                    {PI}Kg/m3
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={darkandlight}>dark to light</button>
      </div>
    </div>
  );
};
