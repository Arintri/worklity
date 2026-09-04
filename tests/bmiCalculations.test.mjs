import test from "node:test";
import assert from "node:assert/strict";
import { calculateBMIDetails, classifyBMI, convertHeightToCm, BMI_LIMITS } from "../app/bmi-calculator/bmiCalculations.mjs";

const base = { age: "30", sex: "male", heightUnit: "cm", heightCm: "200", weightKg: "80", waistCm: "" };
test("BMI formula and one-decimal display", () => {
  const r = calculateBMIDetails(base);
  assert.equal(r.ok, true); assert.equal(r.bmi, 20); assert.equal(r.bmiDisplay, "20.0"); assert.equal(r.waist, null);
  assert.equal(calculateBMIDetails({ ...base, heightCm: 170, weightKg: 65 }).bmiDisplay, "22.5");
});
test("feet/inches convert exactly and agree with centimetres", () => {
  assert.ok(Math.abs(convertHeightToCm({ heightUnit: "ft", feet: 5, inches: 6 }).heightCm - 167.64) < 1e-10);
  const a = calculateBMIDetails({ ...base, heightUnit: "ft", feet: 5, inches: 6.5 });
  const b = calculateBMIDetails({ ...base, heightCm: (5 * 12 + 6.5) * 2.54 });
  assert.equal(a.bmi, b.bmi);
});
test("adult restriction and whole-year age validation", () => {
  for (const age of [0, 12, 17, 17.99]) assert.equal(calculateBMIDetails({ ...base, age }).error, "ADULTS_ONLY");
  assert.equal(calculateBMIDetails({ ...base, age: 18 }).ok, true);
  assert.equal(calculateBMIDetails({ ...base, age: 120 }).ok, true);
  for (const age of [18.5, 121, "", null, Infinity]) assert.equal(calculateBMIDetails({ ...base, age }).ok, false);
});
test("Indian boundaries use unrounded BMI", () => {
  for (const [bmi, category] of [[18.4999,"UNDERWEIGHT"],[18.5,"NORMAL"],[22.9999,"NORMAL"],[23,"OVERWEIGHT"],[24.9999,"OVERWEIGHT"],[25,"OBESITY"],[30,"OBESITY"]]) {
    assert.equal(classifyBMI(bmi), category);
    assert.equal(calculateBMIDetails({ ...base, weightKg: bmi * 4 }).indiaCategory, category);
  }
  const r = calculateBMIDetails({ ...base, weightKg: 22.96 * 4 });
  assert.equal(r.bmiDisplay, "23.0"); assert.equal(r.indiaCategory, "NORMAL");
});
test("WHO reference boundaries remain separate", () => {
  for (const [bmi, category] of [[18.4999,"UNDERWEIGHT"],[18.5,"NORMAL"],[23,"NORMAL"],[24.9999,"NORMAL"],[25,"OVERWEIGHT"],[29.9999,"OVERWEIGHT"],[30,"OBESITY"]]) assert.equal(classifyBMI(bmi,"who"),category);
  const r = calculateBMIDetails({ ...base, weightKg: 100 });
  assert.equal(r.indiaCategory, "OBESITY"); assert.equal(r.whoCategory, "OVERWEIGHT");
});
test("invalid numbers never produce a result", () => {
  for (const bad of ["", " ", "abc", "1,000", "1e309", "1e2", NaN, Infinity, -Infinity, null, undefined, true, [], {}, 0, -1]) {
    for (const field of ["heightCm", "weightKg"]) assert.equal(calculateBMIDetails({ ...base, [field]: bad }).ok,false,field+String(bad));
  }
  for (const input of [null,[],false,undefined]) assert.equal(calculateBMIDetails(input).ok,false);
  for (const input of [null,[],false,undefined]) assert.equal(convertHeightToCm(input).ok,false);
  for (const bmi of [NaN,Infinity,-1,0,"23"]) assert.equal(classifyBMI(bmi),null);
  assert.equal(classifyBMI(23,"invalid"),null);
});
test("supported units and feet/inches validated", () => {
  for (const heightUnit of ["m","",null]) assert.equal(calculateBMIDetails({...base,heightUnit}).ok,false);
  for (const [feet,inches] of [[5,12],[5,-1],[5,""],[5.5,0],[10,0],["",0]]) assert.equal(calculateBMIDetails({...base,heightUnit:"ft",feet,inches}).ok,false);
  assert.equal(calculateBMIDetails({...base,heightUnit:"ft",feet:6,inches:0}).ok,true);
});
test("measurement product limits reject outside values", () => {
  for (const [field,min,max] of [["heightCm",BMI_LIMITS.minHeightCm,BMI_LIMITS.maxHeightCm],["weightKg",BMI_LIMITS.minWeightKg,BMI_LIMITS.maxWeightKg],["waistCm",BMI_LIMITS.minWaistCm,BMI_LIMITS.maxWaistCm]]) {
    for (const value of [min,max]) assert.equal(calculateBMIDetails({...base,[field]:value}).ok,true);
    for (const value of [min-.01,max+.01]) assert.equal(calculateBMIDetails({...base,[field]:value}).ok,false);
  }
});
test("waist is independent, optional and uses verified sex-specific references", () => {
  for (const [sex,reference] of [["male",90],["female",80]]) {
    for (const delta of [-.01,0,.01]) {
      const r=calculateBMIDetails({...base,sex,waistCm:reference+delta});
      assert.equal(r.waist.status,delta<0?"BELOW_REFERENCE":"AT_OR_ABOVE_REFERENCE"); assert.equal(r.bmi,20); assert.equal(r.guidance,"MAINTAIN");
    }
  }
  for (const waistCm of ["",null,undefined,"  "]) assert.equal(calculateBMIDetails({...base,waistCm}).waist,null);
  for (const waistCm of [0,"bad",true,Infinity]) assert.equal(calculateBMIDetails({...base,waistCm}).ok,false);
  assert.equal(calculateBMIDetails({...base,sex:""}).error,"INVALID_SEX");
});
test("guidance never routes underweight users to elevated-BMI advice", () => {
  for (const [weightKg,guidance] of [[60,"UNDERWEIGHT"],[80,"MAINTAIN"],[92,"ELEVATED"],[100,"ELEVATED"]]) assert.equal(calculateBMIDetails({...base,weightKg,waistCm:100}).guidance,guidance);
});
