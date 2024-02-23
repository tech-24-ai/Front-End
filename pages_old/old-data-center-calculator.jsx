import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Col, InputNumber, Row, Slider, Tooltip } from "antd";
import { Button, FormGroup, Label, Input } from "reactstrap";

const dataCenterCalculator = () => {
  const [data_center_tier, setData_center_tier] = useState("Tier III");
  const [staff_24_7, setStaff_24_7] = useState("No");
  const [no_of_cabinet, setNo_of_cabinet] = useState(10);
  const [redun_power, setRedun_power] = useState(10);
  const [eval_period_yrs, setEval_period_yrs] = useState(3);
  const [powr_percentage, setPowr_percentage] = useState(90);
  const [internet_mbps, setInternet_mbps] = useState(10);
  const [cost, setCost] = useState(11);

  const [engineeringAndPreperation, setEngineeringAndPreperation] = useState({
    engineering: {
      description: "Engineering",
      multiplierA: 0,
      multiplierB: 0.045,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    PermitsAndApprovals: {
      description: "Permits and Approvals",
      multiplierA: 0,
      multiplierB: 0.00836232271875836,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    DemolitionOutsidePreparation: {
      description: "Demolition & Outside Preparation",
      multiplierA: 0,
      multiplierB: 0.00836232271875836,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
  });
  //
  const [powerTable, setPowerTable] = useState({
    UtilityImprovements: {
      description: "Utility Improvements",
      multiplierA: 0.0167,
      multiplierB: 0.00724734635625725,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    MainSwitchGear: {
      description: "Main Switch Gear",
      multiplierA: 0.09,
      multiplierB: 0.041,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    TransferSwitches: {
      description: "Transfer Switches",
      multiplierA: 0.065,
      multiplierB: 0.00557488181250558,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    UPSSystems: {
      description: "UPS Systems",
      multiplierA: 0.18,
      multiplierB: 0.04,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    TVSSSystem: {
      description: "TVSS System",
      multiplierA: 0.00111497636250112,
      multiplierB: 0.00111497636250112,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    GeneratorsWithEnclosures: {
      description: "Generators with Enclosures",
      multiplierA: 0.144,
      multiplierB: 0.028989385425029,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    CounduitAndCabling: {
      description: "Counduit and Cabling for Generators",
      multiplierA: 0.00445990545000446,
      multiplierB: 0.00445990545000446,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    DataCenterLighting: {
      description: "Data Center Lighting with HMT",
      multiplierA: 0.00468290072250468,
      multiplierB: 0.00401391490500401,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    LightiningProtection: {
      description: "Lightining Protection",
      multiplierA: 0.00167246454375167,
      multiplierB: 0.000557488181250558,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    RoomPDU: {
      description: "Room PDU's",
      multiplierA: 0.05,
      multiplierB: 0.04,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
  });
  //
  const [environmentalControls, setEnvironmentalControls] = useState({
    HVAC: {
      description: "HVAC",
      multiplierA: 0.062,
      multiplierB: 0.0445990545000446,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    RaisedFloor: {
      description: "Raised Floor",
      multiplierA: 0.0086968156275087,
      multiplierB: 0.0133797163500134,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    CondesateDrains: {
      description: "Condesate Drains",
      multiplierA: 0.000891981090000892,
      multiplierB: 0.000891981090000892,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    LeakDetection: {
      description: "Leak Detection",
      multiplierA: 0.00267594327000268,
      multiplierB: 0.000535188654000535,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    IntergenFireSuppresion: {
      description: "Intergen Fire Suppresion",
      multiplierA: 0.0189,
      multiplierB: 0.00668985817500669,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
  });
  //
  const [securityAndMonitoring, setSecurityAndMonitoring] = useState({
    FacilityManagementSystem: {
      description: "Facility Management System",
      multiplierA: 0.00668985817500669,
      multiplierB: 0.00111497636250112,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    CCTVSystem: {
      description: "CCTV System",
      multiplierA: 0.00334492908750334,
      multiplierB: 0.000557488181250558,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    BuildingAccessSystem: {
      description: "Building Access system",
      multiplierA: 0.0033,
      multiplierB: 0.000557488181250558,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
  });
  //
  const [networkTable, setnetworkTable] = useState({
    CoreNetworkEquipment: {
      description: "Core Network Equipment",
      multiplierA: 0,
      multiplierB: 0.033,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
  });
  //
  const [dataCenterTable, setDataCenterTable] = useState({
    ConstructionCost: {
      description: "Construction Cost",
      multiplierA: 0,
      multiplierB: 0.045,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    FloorSpace: {
      description: "Floor Space",
      // no cases for i-13
      multiplierA: 0,
      multiplierB: 0.033,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    Electricity: {
      description: "Electricity",
      multiplierA: 0,
      multiplierB: 0.00836232271875836,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    ElectricalMaintenance: {
      description: "Electrical Maintenance",
      multiplierA: 0.0167,
      multiplierB: 0.00724734635625725,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    HVACMaintenanance: {
      description: "HVAC Maintenanance",
      multiplierA: 0.09,
      multiplierB: 0.041,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    OtherSystemsMaintenance: {
      description: "Other Systems Maintenance",
      multiplierA: 0.065,
      multiplierB: 0.00557488181250558,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    Staff: {
      description: "24x7x365 Staff",
      multiplierA: 0.18,
      multiplierB: 0.04,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
    RedundantInternetCircuits: {
      description: "Redundant Internet Circuits",
      multiplierA: 0.00111497636250112,
      multiplierB: 0.00111497636250112,
      MATERIAL_COST: 0,
      LABOR_COST: 0,
      TOTAL: 0,
    },
  });

  // dragable states value's
  const cabinetData = (value) => {
    setNo_of_cabinet(value);
  };
  const redundantPowerData = (value) => {
    setRedun_power(value);
  };
  const yearsData = (value) => {
    setEval_period_yrs(value);
  };
  const powerData = (value) => {
    setPowr_percentage(value);
  };
  const connectionData = (value) => {
    setInternet_mbps(value);
  };
  const TierDataSelection = (value) => {
    setData_center_tier(value.target.value);
  };
  const staffedDataSelection = (value) => {
    setStaff_24_7(value.target.value);
  };
  const costData = (value) => {
    setCost(value);
  };

  // states name as per JS file
  var C4 = data_center_tier;
  var C6 = no_of_cabinet;
  if (C6 < 10) {
    C6 = 10;
  }
  var C7 = redun_power;
  var E7 = C7;
  var C8 = C6 * 25;
  var H4 = eval_period_yrs;
  var H5 = powr_percentage;
  var H6 = cost;
  var H7 = internet_mbps;
  // var H8 = $("#s247").val();
  var K4 = H4;
  var K5 = H5;
  var K6 = H6;
  var K7 = H7;
  var E8 = ((C7 * 1000) / C8).toFixed(0);
  var H8 = staff_24_7;

  var E34 =
    (C7 < 20 ? 20 : C7) *
      (C4 == "Tier I"
        ? 11500
        : C4 == "Tier II"
        ? 12500
        : C4 == "Tier III"
        ? 23000
        : C4 == "Tier IV"
        ? 25000
        : 11500) +
    (C8 < 250 ? 250 : C8) * 300;

  // for (var i = 12; i < 34; i++) {
  //   var multiplierA = 0;
  //   var multiplierB = 0;
  //   switch (i) {
  //     case 12:
  //       multiplierA = 0;
  //       multiplierB = 0.045;

  //       break;
  //     case 13:
  //       multiplierA = 0;
  //       multiplierB = 0.00836232271875836;
  //       break;
  //     case 14:
  //       multiplierA = 0;
  //       multiplierB = 0.00836232271875836;

  //       break;
  //     case 15:
  //       multiplierA = 0.0167;
  //       multiplierB = 0.00724734635625725;
  //       break;
  //     case 16:
  //       multiplierA = 0.09;
  //       multiplierB = 0.041;
  //       break;
  //     case 17:
  //       multiplierA = 0.065;
  //       multiplierB = 0.00557488181250558;
  //       break;
  //     case 18:
  //       multiplierA = 0.18;
  //       multiplierB = 0.04;
  //       break;
  //     case 19:
  //       multiplierA = 0.00111497636250112;
  //       multiplierB = 0.00111497636250112;
  //       break;
  //     case 20:
  //       multiplierA = 0.144;
  //       multiplierB = 0.028989385425029;
  //       break;
  //     case 21:
  //       multiplierA = 0.00445990545000446;
  //       multiplierB = 0.00445990545000446;
  //       break;
  //     case 22:
  //       multiplierA = 0.00468290072250468;
  //       multiplierB = 0.00401391490500401;
  //       break;
  //     case 23:
  //       multiplierA = 0.00167246454375167;
  //       multiplierB = 0.000557488181250558;
  //       break;
  //     case 24:
  //       multiplierA = 0.05;
  //       multiplierB = 0.04;
  //       break;
  //     case 25:
  //       multiplierA = 0.062;
  //       multiplierB = 0.0445990545000446;
  //       break;
  //     case 26:
  //       multiplierA = 0.0086968156275087;
  //       multiplierB = 0.0133797163500134;
  //       break;
  //     case 27:
  //       multiplierA = 0.000891981090000892;
  //       multiplierB = 0.000891981090000892;
  //       break;
  //     case 28:
  //       multiplierA = 0.00267594327000268;
  //       multiplierB = 0.000535188654000535;
  //       break;
  //     case 29:
  //       multiplierA = 0.0189;
  //       multiplierB = 0.00668985817500669;
  //       break;
  //     case 30:
  //       multiplierA = 0.00668985817500669;
  //       multiplierB = 0.00111497636250112;
  //       break;
  //     case 31:
  //       multiplierA = 0.00334492908750334;
  //       multiplierB = 0.000557488181250558;
  //       break;
  //     case 32:
  //       multiplierA = 0.0033;
  //       multiplierB = 0.000557488181250558;
  //       break;
  //     case 33:
  //       multiplierA = 0;
  //       multiplierB = 0.033;
  //       break;
  //   }

  // console.log(`E34:`, E34);
  // console.log(`#cell-c${i}:`, E34 * multiplierA);
  // console.log(`#cell-d${i}:`, E34 * multiplierB);
  // console.log(`#cell-e${i}:`, E34 * multiplierA + E34 * multiplierB);
  // console.log("i", i);
  // if (i == 12) {
  // setEngineeringAndPreperation({
  //   MATERIAL_COST: E34 * multiplierA,
  //   LABOR_COST: E34 * multiplierB,
  //   TOTAL: E34 * multiplierA + E34 * multiplierB,
  // });
  // document.getElementById("cell-c12").innerHTML=E34 * multiplierA
  // document.getElementById("cell-d12").innerHTML = E34 * multiplierB;
  // document.getElementById("cell-e12").innerHTML = E34 * multiplierA + E34 * multiplierB;
  // }
  // console.log("engineeringAndPreperation", engineeringAndPreperation);
  // function gcval(cell) {
  // value = cell.toLowerCase();
  // value = value.substring(1);
  // value = value.replace(/,/g, "");
  // value = parseFloat(value);
  // return value;
  // }

  // table two
  //   var totalA = 0;
  //   var totalB = 0;
  //   for (var i = 12; i < 20; i++) {
  //     var resultsA = 0;
  //     var resultsB = 0;
  //     switch (i) {
  //       case 12:
  //         resultsA = E34;
  //         resultsB = 0;
  //         break;
  //       case 13:
  //         resultsA = C8 * 20 * K4;
  //         resultsB = (E8 < 101 ? C8 * 17 : (C8 * 17 * E8) / 100) * K4 * 12;
  //         break;
  //       case 14:
  //         resultsA = ((E7 * 2 * K6) / 100) * 720 * K4 * 12 * (K5 / 100);
  //         resultsB =
  //           ((E7 * K6) / 100) *
  //           720 *
  //           K4 *
  //           12 *
  //           ((K5 < 50 ? 50 : K5) / 100) *
  //           4.2;
  //         break;
  //       case 15:
  //         resultsA =
  //           parseFloat(
  //             48150.0 + 34775.0 + 96300.0 + 596.51 + 77040.0 + 26750.0
  //           ) / 10;
  //         resultsB = 0;
  //         break;
  //       case 16:
  //         resultsA = 33170.0 * 0.032 * K4;
  //         resultsB = 0;
  //         break;
  //       case 17:
  //         resultsA = 10111.5 + 3579.07 + 1789.54 + 1765.5 * 0.032 * K4;
  //         resultsB = 0;
  //         break;
  //       case 18:
  //         resultsA = H8 == "Yes" ? 0 : 60000 * K4;
  //         resultsB = 0;
  //         break;
  //       case 19:
  //         resultsA = (1000 * 2 + (K7 - 10) * 20 * 2) * K4 * 12;
  //         resultsB = (K7 < 50 ? K7 * 40 : K7 * 30) * K4 * 12;
  //         break;
  //     }

  //     totalA = totalA + resultsA;
  //     totalB = totalB + resultsB;

  //     console.log("totalA", totalA);
  //     console.log("totalB", totalB);
  //     console.log("resultsA", resultsA);
  //     console.log("resultsB", resultsB);
  //   }
  // }

  useEffect(() => {
    var C4 = data_center_tier;
    var C6 = no_of_cabinet;
    if (C6 < 10) {
      C6 = 10;
    }
    var C7 = redun_power;
    var E7 = C7;
    var C8 = C6 * 25;

    var H4 = eval_period_yrs;
    var H5 = powr_percentage;
    var H6 = cost;
    var H7 = internet_mbps;
    // var H8 = $("#s247").val();
    var K4 = H4;
    var K5 = H5;
    var K6 = H6;
    var K7 = H7;
    var E8 = ((C7 * 1000) / C8).toFixed(0);
    var H8 = staff_24_7;

    var E34 =
      (C7 < 20 ? 20 : C7) *
        (C4 == "Tier I"
          ? 11500
          : C4 == "Tier II"
          ? 12500
          : C4 == "Tier III"
          ? 23000
          : C4 == "Tier IV"
          ? 25000
          : 11500) +
      (C8 < 250 ? 250 : C8) * 300;

    setEngineeringAndPreperation((preState) => ({
      ...preState,
      ["engineering"]: {
        ...preState.engineering,
        MATERIAL_COST: E34 * preState.engineering.multiplierA,
        LABOR_COST: E34 * preState.engineering.multiplierB,
        TOTAL:
          E34 * preState.engineering.multiplierA +
          E34 * preState.engineering.multiplierB,
      },
      ["PermitsAndApprovals"]: {
        ...preState.PermitsAndApprovals,
        MATERIAL_COST: E34 * preState.PermitsAndApprovals.multiplierA,
        LABOR_COST: E34 * preState.PermitsAndApprovals.multiplierB,
        TOTAL:
          E34 * preState.PermitsAndApprovals.multiplierA +
          E34 * preState.PermitsAndApprovals.multiplierB,
      },
      ["DemolitionOutsidePreparation"]: {
        ...preState.DemolitionOutsidePreparation,
        MATERIAL_COST: E34 * preState.DemolitionOutsidePreparation.multiplierA,
        LABOR_COST: E34 * preState.DemolitionOutsidePreparation.multiplierB,
        TOTAL:
          E34 * preState.DemolitionOutsidePreparation.multiplierA +
          E34 * preState.DemolitionOutsidePreparation.multiplierB,
      },
    }));

    setPowerTable((preState) => ({
      ...preState,
      ["UtilityImprovements"]: {
        ...preState.UtilityImprovements,
        MATERIAL_COST: E34 * preState.UtilityImprovements.multiplierA,
        LABOR_COST: E34 * preState.UtilityImprovements.multiplierB,
        TOTAL:
          E34 * preState.UtilityImprovements.multiplierA +
          E34 * preState.UtilityImprovements.multiplierB,
      },
      ["MainSwitchGear"]: {
        ...preState.MainSwitchGear,
        MATERIAL_COST: E34 * preState.MainSwitchGear.multiplierA,
        LABOR_COST: E34 * preState.MainSwitchGear.multiplierB,
        TOTAL:
          E34 * preState.MainSwitchGear.multiplierA +
          E34 * preState.MainSwitchGear.multiplierB,
      },
      ["TransferSwitches"]: {
        ...preState.TransferSwitches,
        MATERIAL_COST: E34 * preState.TransferSwitches.multiplierA,
        LABOR_COST: E34 * preState.TransferSwitches.multiplierB,
        TOTAL:
          E34 * preState.TransferSwitches.multiplierA +
          E34 * preState.TransferSwitches.multiplierB,
      },
      ["UPSSystems"]: {
        ...preState.UPSSystems,
        MATERIAL_COST: E34 * preState.UPSSystems.multiplierA,
        LABOR_COST: E34 * preState.UPSSystems.multiplierB,
        TOTAL:
          E34 * preState.UPSSystems.multiplierA +
          E34 * preState.UPSSystems.multiplierB,
      },
      ["TVSSSystem"]: {
        ...preState.TVSSSystem,
        MATERIAL_COST: E34 * preState.TVSSSystem.multiplierA,
        LABOR_COST: E34 * preState.TVSSSystem.multiplierB,
        TOTAL:
          E34 * preState.TVSSSystem.multiplierA +
          E34 * preState.TVSSSystem.multiplierB,
      },
      ["GeneratorsWithEnclosures"]: {
        ...preState.GeneratorsWithEnclosures,
        MATERIAL_COST: E34 * preState.GeneratorsWithEnclosures.multiplierA,
        LABOR_COST: E34 * preState.GeneratorsWithEnclosures.multiplierB,
        TOTAL:
          E34 * preState.GeneratorsWithEnclosures.multiplierA +
          E34 * preState.GeneratorsWithEnclosures.multiplierB,
      },
      ["CounduitAndCabling"]: {
        ...preState.CounduitAndCabling,
        MATERIAL_COST: E34 * preState.CounduitAndCabling.multiplierA,
        LABOR_COST: E34 * preState.CounduitAndCabling.multiplierB,
        TOTAL:
          E34 * preState.CounduitAndCabling.multiplierA +
          E34 * preState.CounduitAndCabling.multiplierB,
      },
      ["DataCenterLighting"]: {
        ...preState.DataCenterLighting,
        MATERIAL_COST: E34 * preState.DataCenterLighting.multiplierA,
        LABOR_COST: E34 * preState.DataCenterLighting.multiplierB,
        TOTAL:
          E34 * preState.DataCenterLighting.multiplierA +
          E34 * preState.DataCenterLighting.multiplierB,
      },
      ["LightiningProtection"]: {
        ...preState.LightiningProtection,
        MATERIAL_COST: E34 * preState.LightiningProtection.multiplierA,
        LABOR_COST: E34 * preState.LightiningProtection.multiplierB,
        TOTAL:
          E34 * preState.LightiningProtection.multiplierA +
          E34 * preState.LightiningProtection.multiplierB,
      },
      ["RoomPDU"]: {
        ...preState.RoomPDU,
        MATERIAL_COST: E34 * preState.RoomPDU.multiplierA,
        LABOR_COST: E34 * preState.RoomPDU.multiplierB,
        TOTAL:
          E34 * preState.RoomPDU.multiplierA +
          E34 * preState.RoomPDU.multiplierB,
      },
    }));

    setEnvironmentalControls((preState) => ({
      ...preState,
      ["HVAC"]: {
        ...preState.HVAC,
        MATERIAL_COST: E34 * preState.HVAC.multiplierA,
        LABOR_COST: E34 * preState.HVAC.multiplierB,
        TOTAL:
          E34 * preState.HVAC.multiplierA + E34 * preState.HVAC.multiplierB,
      },
      ["RaisedFloor"]: {
        ...preState.RaisedFloor,
        MATERIAL_COST: E34 * preState.RaisedFloor.multiplierA,
        LABOR_COST: E34 * preState.RaisedFloor.multiplierB,
        TOTAL:
          E34 * preState.RaisedFloor.multiplierA +
          E34 * preState.RaisedFloor.multiplierB,
      },
      ["CondesateDrains"]: {
        ...preState.CondesateDrains,
        MATERIAL_COST: E34 * preState.CondesateDrains.multiplierA,
        LABOR_COST: E34 * preState.CondesateDrains.multiplierB,
        TOTAL:
          E34 * preState.CondesateDrains.multiplierA +
          E34 * preState.CondesateDrains.multiplierB,
      },
      ["LeakDetection"]: {
        ...preState.LeakDetection,
        MATERIAL_COST: E34 * preState.LeakDetection.multiplierA,
        LABOR_COST: E34 * preState.LeakDetection.multiplierB,
        TOTAL:
          E34 * preState.LeakDetection.multiplierA +
          E34 * preState.LeakDetection.multiplierB,
      },
      ["IntergenFireSuppresion"]: {
        ...preState.IntergenFireSuppresion,
        MATERIAL_COST: E34 * preState.IntergenFireSuppresion.multiplierA,
        LABOR_COST: E34 * preState.IntergenFireSuppresion.multiplierB,
        TOTAL:
          E34 * preState.IntergenFireSuppresion.multiplierA +
          E34 * preState.IntergenFireSuppresion.multiplierB,
      },
    }));

    setSecurityAndMonitoring((preState) => ({
      ["FacilityManagementSystem"]: {
        ...preState.FacilityManagementSystem,
        MATERIAL_COST: E34 * preState.FacilityManagementSystem.multiplierA,
        LABOR_COST: E34 * preState.FacilityManagementSystem.multiplierB,
        TOTAL:
          E34 * preState.FacilityManagementSystem.multiplierA +
          E34 * preState.FacilityManagementSystem.multiplierB,
      },
      ["CCTVSystem"]: {
        ...preState.CCTVSystem,
        MATERIAL_COST: E34 * preState.CCTVSystem.multiplierA,
        LABOR_COST: E34 * preState.CCTVSystem.multiplierB,
        TOTAL:
          E34 * preState.CCTVSystem.multiplierA +
          E34 * preState.CCTVSystem.multiplierB,
      },
      ["BuildingAccessSystem"]: {
        ...preState.BuildingAccessSystem,
        MATERIAL_COST: E34 * preState.BuildingAccessSystem.multiplierA,
        LABOR_COST: E34 * preState.BuildingAccessSystem.multiplierB,
        TOTAL:
          E34 * preState.BuildingAccessSystem.multiplierA +
          E34 * preState.BuildingAccessSystem.multiplierB,
      },
    }));

    setnetworkTable((preState) => ({
      ["CoreNetworkEquipment"]: {
        ...preState.CoreNetworkEquipment,
        MATERIAL_COST: E34 * preState.CoreNetworkEquipment.multiplierA,
        LABOR_COST: E34 * preState.CoreNetworkEquipment.multiplierB,
        TOTAL:
          E34 * preState.CoreNetworkEquipment.multiplierA +
          E34 * preState.CoreNetworkEquipment.multiplierB,
      },
    }));

    setDataCenterTable((preState) => ({
      ["ConstructionCost"]: {
        ...preState.ConstructionCost,
        MATERIAL_COST: E34 * preState.ConstructionCost.multiplierA,
        LABOR_COST: E34 * preState.ConstructionCost.multiplierB,
        TOTAL:
          E34 * preState.ConstructionCost.multiplierA +
          E34 * preState.ConstructionCost.multiplierB,
      },
      ["FloorSpace"]: {
        ...preState.FloorSpace,
        MATERIAL_COST: E34 * preState.FloorSpace.multiplierA,
        LABOR_COST: E34 * preState.FloorSpace.multiplierB,
        TOTAL:
          E34 * preState.FloorSpace.multiplierA +
          E34 * preState.FloorSpace.multiplierB,
      },
      ["Electricity"]: {
        ...preState.Electricity,
        MATERIAL_COST: E34 * preState.Electricity.multiplierA,
        LABOR_COST: E34 * preState.Electricity.multiplierB,
        TOTAL:
          E34 * preState.Electricity.multiplierA +
          E34 * preState.Electricity.multiplierB,
      },
      ["ElectricalMaintenance"]: {
        ...preState.ElectricalMaintenance,
        MATERIAL_COST: E34 * preState.ElectricalMaintenance.multiplierA,
        LABOR_COST: E34 * preState.ElectricalMaintenance.multiplierB,
        TOTAL:
          E34 * preState.ElectricalMaintenance.multiplierA +
          E34 * preState.ElectricalMaintenance.multiplierB,
      },
      ["HVACMaintenanance"]: {
        ...preState.HVACMaintenanance,
        MATERIAL_COST: E34 * preState.HVACMaintenanance.multiplierA,
        LABOR_COST: E34 * preState.HVACMaintenanance.multiplierB,
        TOTAL:
          E34 * preState.HVACMaintenanance.multiplierA +
          E34 * preState.HVACMaintenanance.multiplierB,
      },
      ["OtherSystemsMaintenance"]: {
        ...preState.OtherSystemsMaintenance,
        MATERIAL_COST: E34 * preState.OtherSystemsMaintenance.multiplierA,
        LABOR_COST: E34 * preState.OtherSystemsMaintenance.multiplierB,
        TOTAL:
          E34 * preState.OtherSystemsMaintenance.multiplierA +
          E34 * preState.OtherSystemsMaintenance.multiplierB,
      },
      ["Staff"]: {
        ...preState.Staff,
        MATERIAL_COST: E34 * preState.Staff.multiplierA,
        LABOR_COST: E34 * preState.Staff.multiplierB,
        TOTAL:
          E34 * preState.Staff.multiplierA + E34 * preState.Staff.multiplierB,
      },
      ["RedundantInternetCircuits"]: {
        ...preState.RedundantInternetCircuits,
        MATERIAL_COST: E34 * preState.RedundantInternetCircuits.multiplierA,
        LABOR_COST: E34 * preState.RedundantInternetCircuits.multiplierB,
        TOTAL:
          E34 * preState.RedundantInternetCircuits.multiplierA +
          E34 * preState.RedundantInternetCircuits.multiplierB,
      },
    }));
  }, [
    data_center_tier,
    staff_24_7,
    no_of_cabinet,
    redun_power,
    eval_period_yrs,
    powr_percentage,
    internet_mbps,
    cost,
  ]);

  var c16;
  var c17;
  var c18;
  var c19;
  var c20;
  var c24;
  var c25;
  var c29;
  var c30;
  var c31;
  var c32;
  Object.keys(powerTable).map((key, index) => {
    if (index == 1) {
      c16 = powerTable[key].MATERIAL_COST;
    }
    if (index == 2) {
      c17 = powerTable[key].MATERIAL_COST;
    }
    if (index == 3) {
      c18 = powerTable[key].MATERIAL_COST;
    }
    if (index == 4) {
      c19 = powerTable[key].MATERIAL_COST;
    }
    if (index == 5) {
      c20 = powerTable[key].MATERIAL_COST;
    }
    if (index == 9) {
      c24 = powerTable[key].MATERIAL_COST;
    }
  });
  Object.keys(environmentalControls).map((key, index) => {
    if (index == 0) {
      c25 = environmentalControls[key].MATERIAL_COST;
    }
    if (index == 4) {
      c29 = environmentalControls[key].MATERIAL_COST;
    }
  });
  Object.keys(securityAndMonitoring).map((key, index) => {
    if (index == 0) {
      c30 = securityAndMonitoring[key].MATERIAL_COST;
    }
    if (index == 1) {
      c31 = securityAndMonitoring[key].MATERIAL_COST;
    }
    if (index == 2) {
      c32 = securityAndMonitoring[key].MATERIAL_COST;
    }
  });

  let engineeringAndPreperationTotal = 0;
  Object.keys(engineeringAndPreperation).map((key, index) => {
    // console.log(
    //   "engineeringAndPreperation",
    //   engineeringAndPreperation[key].TOTAL
    // );
    engineeringAndPreperationTotal += engineeringAndPreperation[key].TOTAL;
  });

  let powerTableTotal = 0;
  Object.keys(powerTable).map((key, index) => {
    powerTableTotal += powerTable[key].TOTAL;
  });

  let environmentalControlsTotal = 0;
  Object.keys(environmentalControls).map((key, index) => {
    environmentalControlsTotal += environmentalControls[key].TOTAL;
  });
  let securityAndMonitoringTotal = 0;
  Object.keys(securityAndMonitoring).map((key, index) => {
    securityAndMonitoringTotal += securityAndMonitoring[key].TOTAL;
  });

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",

      currency: "USD",
    }).format(value);

  let buildYourOwnResult = numberFormat(
    E34 +
      C8 * 20 * K4 +
      ((E7 * 2 * K6) / 100) * 720 * K4 * 12 * (K5 / 100) +
      (c16 + c17 + c18 + c19 + c20 + c24) / 10 +
      c25 * 0.032 * K4 +
      (c29 + c30 + c31 + c32) * 0.032 * K4 +
      (H8 == "Yes" ? 0 : 60000 * K4) +
      (1000 * 2 + (K7 - 10) * 20 * 2) * K4 * 12
  );

  let colocationSpaceResult = numberFormat(
    (E8 < 101 ? C8 * 17 : (C8 * 17 * E8) / 100) * K4 * 12 +
      ((E7 * K6) / 100) * 720 * K4 * 12 * ((K5 < 50 ? 50 : K5) / 100) * 4.2 +
      (K7 < 50 ? K7 * 40 : K7 * 30) * K4 * 12
  );

  const [activeDisk, setActiveDisk] = useState(1);

  const dataOptions = [
    { id: 1, name: "reasons based cost" },
    { id: 2, name: "user based cost" },
  ];

  // console.log("activeDisk", activeDisk);

  return (
    <div className="OlddataCenterCalculatorContainer">
      <h5 className="heading">Data Center Build vs Buy Calculator</h5>
      <div className="selectionContainer">
        <div>
          <p className="flexTitle">Data Center Tier</p>
          <select onChange={TierDataSelection}>
            <option value="Tier I">Tier I</option>
            <option value="Tier II">Tier II</option>
            <option selected value="Tier III">
              Tier III
            </option>
            <option value="Tier IV">Tier IV</option>
          </select>
        </div>
        <div>
          <p className="flexTitle">Are You Currently Staffed 24x7x365</p>
          <select onChange={staffedDataSelection}>
            <option selected value="No">
              No
            </option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>
      <div className="inputContainer">
        <div>
          <div>
            <CustomTooltip
              title={"Number of Cabinets: Enter how many cabinets you need"}
            >
              <p className="flexTitle">Number of Cabinets*</p>
            </CustomTooltip>
            <Row className="antRowContainer">
              <Col span={17}>
                <Slider
                  min={1}
                  max={500}
                  onChange={cabinetData}
                  value={typeof no_of_cabinet === "number" ? no_of_cabinet : 0}
                />
              </Col>
              <p className="flexInput">{no_of_cabinet}</p>
            </Row>
          </div>
          <div>
            <CustomTooltip
              title={
                "Total kW of Redundant Power: Kw can be calculated by either adding up the name plate power supply capacities of your hardware and dividing by 1,000, or by taking the amps X the volts of your power circuits powering your equipment and dividing by 1,000."
              }
            >
              <p className="flexTitle">Total kW of Redundant Power*</p>
            </CustomTooltip>
            <Row className="antRowContainer">
              <Col span={17}>
                <Slider
                  min={10}
                  max={1000}
                  onChange={redundantPowerData}
                  value={typeof redun_power === "number" ? redun_power : 0}
                />
              </Col>
              <p className="flexInput">{redun_power}</p>
            </Row>
          </div>
          <div>
            <CustomTooltip
              title={
                "Evaluation Period: 5 years is the average evalutation period and equipment will need refreshed starting year 6."
              }
            >
              <p className="flexTitle">Evaluation Period in Years</p>
            </CustomTooltip>
            <Row className="antRowContainer">
              <Col span={17}>
                <Slider
                  min={1}
                  max={10}
                  onChange={yearsData}
                  value={
                    typeof eval_period_yrs === "number" ? eval_period_yrs : 0
                  }
                />
              </Col>
              <p className="flexInput">{eval_period_yrs}</p>
            </Row>
          </div>
        </div>
        <div style={{ marginRight: "18.5%" }}>
          <div>
            <CustomTooltip
              title={
                "% of Available Power Consumed: An average enterprise data center operates at 60%."
              }
            >
              <p className="flexTitle">% of Available Power Consumed</p>
            </CustomTooltip>
            <Row className="antRowContainer">
              <Col span={17}>
                <Slider
                  min={10}
                  max={100}
                  onChange={powerData}
                  value={
                    typeof powr_percentage === "number" ? powr_percentage : 0
                  }
                />
              </Col>
              <p className="flexInput">{powr_percentage}</p>
            </Row>
          </div>

          <div className="radioBoxContainer">
            {dataOptions.map((data, index) => {
              return (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    marginRight: "50px",
                  }}
                  className={`radio-box-wrapper column-class`}
                >
                  <FormGroup>
                    <Label
                      className={activeDisk == data.id ? "labelChecked" : ""}
                    >
                      <Input
                        type="radio"
                        name={data.name}
                        checked={activeDisk == data.id}
                        onClick={() => {
                          setActiveDisk(data.id);
                        }}
                      />
                      {data.name}
                    </Label>
                  </FormGroup>
                </div>
              );
            })}
          </div>

          {activeDisk == 2 ? (
            <Row className="antRowContainer">
              <Col span={17}>
                <Slider
                  min={5}
                  max={35}
                  onChange={costData}
                  value={typeof cost === "number" ? cost : 0}
                />
              </Col>
              <p className="flexInput">{cost}</p>
            </Row>
          ) : (
            <>
              <div>
                <p className="flexTitle">Cost</p>
                <p className="flexInput">{cost}</p>
              </div>
            </>
          )}

          <div>
            <p className="flexTitle">Internet Connection in Mbps</p>
            <Row className="antRowContainer">
              <Col span={17}>
                <Slider
                  min={5}
                  max={100}
                  onChange={connectionData}
                  value={typeof internet_mbps === "number" ? internet_mbps : 0}
                />
              </Col>
              <p className="flexInput">{internet_mbps}</p>
            </Row>
          </div>
        </div>
      </div>
      {/* result section */}
      <div style={{ marginTop: "50px" }}>
        <p className="heading" style={{ textAlign: "center" }}>
          Cost Summary
        </p>
        <div className="resultSection">
          <div>
            <p className="heading">BUILD YOUR OWN</p>
            <h4 className="resultText">{buildYourOwnResult}</h4>
          </div>
          <div className="heading">VS</div>
          <div>
            <p className="heading">TIER III COLOCATION SPACE</p>
            <h4 className="resultText">{colocationSpaceResult}</h4>
          </div>
        </div>
      </div>

      <p className="heading" style={{ textAlign: "center", marginTop: "50px" }}>
        Total Construction Cost **
      </p>
      <p className="heading tableTitle">ENGINEERING AND PREPERATION</p>
      <div className="tableOne">
        <table>
          <tr>
            <th>DESCRIPTION</th>
            <th>MATERIAL COST</th>
            <th>LABOR COST</th>
            <th>TOTAL</th>
          </tr>
          {Object.keys(engineeringAndPreperation).map((key, index) => (
            <tr key={index}>
              <td>{engineeringAndPreperation[key].description}</td>
              <td>
                {numberFormat(engineeringAndPreperation[key].MATERIAL_COST)}
              </td>
              <td>{numberFormat(engineeringAndPreperation[key].LABOR_COST)}</td>
              <td>{numberFormat(engineeringAndPreperation[key].TOTAL)}</td>
            </tr>
          ))}
          <td>total{numberFormat(engineeringAndPreperationTotal)}</td>
        </table>
      </div>

      <p className="heading tableTitle">POWER</p>

      <table>
        <tr>
          <th>DESCRIPTION</th>
          <th>MATERIAL COST</th>
          <th>LABOR COST</th>
          <th>TOTAL</th>
        </tr>
        {Object.keys(powerTable).map((key, index) => (
          <tr key={index}>
            <td>{powerTable[key].description}</td>
            <td>{numberFormat(powerTable[key].MATERIAL_COST)}</td>
            <td>{numberFormat(powerTable[key].LABOR_COST)}</td>
            <td>{numberFormat(powerTable[key].TOTAL)}</td>
          </tr>
        ))}
        <td>total{numberFormat(powerTableTotal)}</td>
      </table>
      <p className="heading tableTitle">ENVIRONMENTAL CONTROLS</p>
      <table>
        <tr>
          <th>DESCRIPTION</th>
          <th>MATERIAL COST</th>
          <th>LABOR COST</th>
          <th>TOTAL</th>
        </tr>
        {Object.keys(environmentalControls).map((key, index) => (
          <tr key={index}>
            <td>{environmentalControls[key].description}</td>
            <td>{numberFormat(environmentalControls[key].MATERIAL_COST)}</td>
            <td>{numberFormat(environmentalControls[key].LABOR_COST)}</td>
            <td>{numberFormat(environmentalControls[key].TOTAL)}</td>
          </tr>
        ))}
      </table>
      <td>total{numberFormat(environmentalControlsTotal)}</td>
      <p className="heading tableTitle">SECURITY AND MONITORING</p>
      <table>
        <tr>
          <th>DESCRIPTION</th>
          <th>MATERIAL COST</th>
          <th>LABOR COST</th>
          <th>TOTAL</th>
        </tr>
        {Object.keys(securityAndMonitoring).map((key, index) => (
          <tr key={index}>
            <td>{securityAndMonitoring[key].description}</td>
            <td>{numberFormat(securityAndMonitoring[key].MATERIAL_COST)}</td>
            <td>{numberFormat(securityAndMonitoring[key].LABOR_COST)}</td>
            <td>{numberFormat(securityAndMonitoring[key].TOTAL)}</td>
          </tr>
        ))}
        <td>total{numberFormat(securityAndMonitoringTotal)}</td>
      </table>
      <p className="heading tableTitle">NEWORK</p>
      <table>
        <tr>
          <th>DESCRIPTION</th>
          <th>MATERIAL COST</th>
          <th>LABOR COST</th>
          <th>TOTAL</th>
        </tr>
        {Object.keys(networkTable).map((key, index) => (
          <tr key={index}>
            <td>{networkTable[key].description}</td>
            <td>{numberFormat(networkTable[key].MATERIAL_COST)}</td>
            <td>{numberFormat(networkTable[key].LABOR_COST)}</td>
            <td>{numberFormat(networkTable[key].TOTAL)}</td>
          </tr>
        ))}
        {Object.keys(networkTable).map((key, index) => (
          <td>result {numberFormat(networkTable[key].TOTAL)}</td>
        ))}
        <td>result {numberFormat(E34)}</td>
      </table>
      <p className="heading tableTitle">DATA CENTER: TOTAL COST OF OWNERSHIP</p>
      <table>
        <tr>
          <th></th>
          <th>BUILD YOUR OWN</th>
          <th style={{ textTransform: "uppercase" }}>
            {data_center_tier} COLOCATION SPACE
          </th>
        </tr>
        <tr>
          <td>Construction Cost</td>
          <td>{numberFormat(E34)}</td>
          <td>{numberFormat(0)}</td>
        </tr>
        <tr>
          <td>Floor Space</td>
          <td>{numberFormat(C8 * 20 * K4)}</td>
          <td>
            {numberFormat(
              (E8 < 101 ? C8 * 17 : (C8 * 17 * E8) / 100) * K4 * 12
            )}
          </td>
        </tr>
        <tr>
          <td>Electricity</td>
          <td>
            {numberFormat(((E7 * 2 * K6) / 100) * 720 * K4 * 12 * (K5 / 100))}
          </td>
          <td>
            {numberFormat(
              ((E7 * K6) / 100) *
                720 *
                K4 *
                12 *
                ((K5 < 50 ? 50 : K5) / 100) *
                4.2
            )}
          </td>
        </tr>
        <tr>
          <td>Electrical Maintenance</td>
          <td>{numberFormat((c16 + c17 + c18 + c19 + c20 + c24) / 10)}</td>
          <td>{numberFormat(0)}</td>
        </tr>
        <tr>
          <td>HVAC Maintenanance</td>
          <td>{numberFormat(c25 * 0.032 * K4)}</td>
          <td>{numberFormat(0)}</td>
        </tr>
        <tr>
          <td>Other Systems Maintenance</td>
          <td>{numberFormat((c29 + c30 + c31 + c32) * 0.032 * K4)}</td>
          <td>{numberFormat(0)}</td>
        </tr>
        <tr>
          <td>24x7x365 Staff</td>
          <td>{numberFormat(H8 == "Yes" ? 0 : 60000 * K4)}</td>
          <td>{numberFormat(0)}</td>
        </tr>
        <tr>
          <td>Redundant Internet Circuits</td>
          <td>{numberFormat((1000 * 2 + (K7 - 10) * 20 * 2) * K4 * 12)}</td>
          <td>{numberFormat((K7 < 50 ? K7 * 40 : K7 * 30) * K4 * 12)}</td>
        </tr>
        <td>{colocationSpaceResult}</td>
        <td>result {buildYourOwnResult}</td>
      </table>

      <BodyBackgroundColor color="#d4e0fe" />
    </div>
  );
};
const CustomTooltip = ({ title, children }) => {
  if (title == null) {
    return children;
  } else {
    return (
      <Tooltip
        placement="bottom"
        title={title}
        // visible={true}
        zIndex={0}
        overlayClassName="splunk-sizing-tooltip"
      >
        {children}
      </Tooltip>
    );
  }
};

export default dataCenterCalculator;
