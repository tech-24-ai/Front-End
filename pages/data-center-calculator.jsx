import React, { useEffect, useState, Fragment } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Slider, Checkbox, Divider } from "antd";
import { Container, Table, Button, ButtonGroup } from "reactstrap";
import Select, { components } from "react-select";
import { crudService } from "../_services";
import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from "react-device-detect";

const NewDataCenterCalculator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const regionConfig = {
    1: "china",
    2: "emergingAsia",
    5: "matureAsia",
    3: "emergingEurope",
    6: "matureEurope",
    8: "northAmerica",
    4: "latinAmerica",
    7: "middleEastAndAfrica",
  };
  const [colocationStatus, setColocationStatus] = useState({
    value: 0,
    label: "No",
  });
  const [replicationCopies, setReplicationCopies] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    label: "United States",
    regionId: 8,
    regionName: "North America",
    value: 231,
  });

  const [computeCapacity, setComputeCapacity] = useState(0);

  const [rackState, setRackState] = useState({
    unit: 0,
    cost: 0,
    isBenchmarksChecked: false,
    range: [10, 25, 25],
    componentKey: "racks",
  });

  const [powerState, setPowerState] = useState({
    numberOfRack: 0,
    powerPerRack: 6, //kw
    contPerKwh: 0,
    range: [2, 5, 5],
    componentKey: "power",
  });

  const [cabinetState, setCabinetState] = useState({
    unit: 0,
    cost: 0,
    isBenchmarksChecked: false,
    range: [10, 25, 25],
    componentKey: "cabinets",
  });
  const [memoryState, setMemoryState] = useState({
    unit: 0,
    cost: 0,
    isBenchmarksChecked: false,
    range: [3000, 10000, 10000],
    componentKey: "memory",
  });

  const [physicalCUPState, setPhysicalCUPState] = useState({
    unit: 0,
    cost: 0,
    isBenchmarksChecked: false,
    range: [20, 50, 50],
    componentKey: "cpu",
  });

  const [storageState, setStorageState] = useState({
    isBenchmarksChecked: false,
    flashStorage: {
      unit: 0,
      cost: 0,
      range: [100, 250, 250],
      componentKey: "flashStorage",
    },
    hddStorage: {
      unit: 0,
      cost: 0,
      range: [100, 250, 250],
      componentKey: "HDDStorage",
    },
  });

  const [ipSwitchesState, setIpSwitchesState] = useState({
    isBenchmarksChecked: false,
    switches16: {
      unit: 0,
      cost: 0,
      range: [3, 6, 6],
      componentKey: "IPSwitches16",
    },
    switches32: {
      unit: 0,
      cost: 0,
      range: [3, 6, 6],
      componentKey: "IPSwitches32",
    },
    switches48: {
      unit: 0,
      cost: 0,
      range: [3, 6, 6],
      componentKey: "IPSwitches48",
    },
    switches64: {
      unit: 0,
      cost: 0,
      range: [3, 6, 6],
      componentKey: "IPSwitches64",
    },
    switches96: {
      unit: 0,
      cost: 0,
      range: [3, 6, 6],
      componentKey: "IPSwitches96",
    },
  });

  const [fabricSwitchesState, setFabricSwitchesState] = useState({
    isBenchmarksChecked: false,
    switches16: {
      unit: 0,
      cost: 0,
      range: [2, 5, 5],
      componentKey: "FCSwitches16",
    },
    switches32: {
      unit: 0,
      cost: 0,
      range: [2, 5, 5],
      componentKey: "FCSwitches32",
    },
  });

  const [hypervisorState, setHypervisorState] = useState({
    unit: 0,
    cost: 0,
    isBenchmarksChecked: false,
    range: [20, 50, 50],
    componentKey: "hypervisor",
  });

  const [backupStorageState, setBackupStorageState] = useState({
    isBenchmarksChecked: false,
    storedInHDD: {
      unit: 0,
      cost: 0,
      range: [100, 250, 250],
      componentKey: "storedInHDD",
    },
    storedInCloud: {
      unit: 0,
      cost: 0,
      range: [100, 250, 250],
      componentKey: "storedInCloud",
    },
    storedInTape: {
      unit: 0,
      cost: 0,
      range: [100, 250, 250],
      componentKey: "storedInTape",
    },
  });
  const [manpowerState, setManpowerState] = useState({
    architects: {
      unit: 0,
      cost: 0,
    },
    administrators: {
      unit: 0,
      cost: 0,
    },
    systemEngineers: {
      unit: 0,
      cost: 0,
    },
  });

  const videoQualityData = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  };

  const [infrastructureRackTable, setInfrastructureRackTable] = useState({
    numberOfRack: {
      component: "Number of racks",
      unit: 10,
      unitCost: 0,
      oneYearCost: 0,
      twoYearCost: 0,
      threeYearCost: 0,
    },
  });

  const [infrastructurePowerTable, setInfrastructurePowerTable] = useState({
    totalPower: {
      component: "Total power",
      numberOfRack: 0,
      powerPerRack: 6, //kw
      constPerKwh: 0,
      oneYearCost: 0,
      twoYearCost: 0,
      threeYearCost: 0,
    },
    totalOwnInfraCost: {
      component: "Total Cost of On-premise Infrastructure",
      unit: 10,
      unitCost: 0,
      oneYearCost: 0,
      twoYearCost: 0,
      threeYearCost: 0,
    },
  });

  const [colocationTable, setColocationTable] = useState({
    numberOfCabinets: {
      component: "Number of cabinets",
      unit: 0, //A=Q3
      unitCostPerRackPerYear: 0, //B=Q3
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=2C
      threeYearCost: 0, //E=3C
    },
  });

  const [computeCostTable, setComputeCostTable] = useState({
    memory: {
      component: "Memory from all applications in GB",
      unit: 0, //A=Q5
      unitCost: 0, //B=Q5
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%C
      threeYearCost: 0, //E=D+15%C
    },
    physical: {
      component: "Physical CPUs",
      unit: 0, //A=Q6
      unitCost: 0, //B=Q6
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    hypervisor: {
      component: "Hypervisor licenses in sockets",
      unit: 0, //A=Q10
      unitCost: 0, //B=Q10
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    constOfDR: {
      component: "Cost of DR infrastructure",
      unit: 0, //A= inputfrom Q.13
      unitCost: 0,
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    total: {
      component: "Total Compute Costs",
      unit: "NA", //A=sum of all above
      unitCost: "NA", //B=sum of all above
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
  });

  const [storageCostTable, setStorageCostTable] = useState({
    flashStorage: {
      component: "Flash storage in TB",
      unit: 0, //A=Q7.1
      unitCost: 0, //B=Q7.1
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    HDDStorage: {
      component: "HDD storage in TB",
      unit: 0, //A=Q7.2
      unitCost: 0, //B=Q7.2
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    replicatedData: {
      component: "Total data replicated in TB",
      unit: 0, //A=input from Q.12
      unitCost: 0,
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    storageCost: {
      component: "Total Storage costs",
      unit: "NA", //A=sum of all above
      unitCost: "NA", //B=sum of all above
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
  });

  const [networkCostTable, setNetworkCostTable] = useState({
    IPSwitches16: {
      component: "IP switches (16 ports)",
      unit: 0, //A=8.1
      unitCost: 0, //B=8.1
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    IPSwitches32: {
      component: "IP switches (32 ports)",
      unit: 0, //A=8.2
      unitCost: 0, //B=8.2
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    IPSwitches48: {
      component: "IP switches (48 ports)",
      unit: 0, //A=8.3
      unitCost: 0, //B=8.3
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    IPSwitches64: {
      component: "IP switches (64 ports)",
      unit: 0, //A=8.4
      unitCost: 0, //B=8.4
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    IPSwitches96: {
      component: "IP switches (96 ports)",
      unit: 0, //A=8.5
      unitCost: 0, //B=8.5
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    FCSwitches16: {
      component: "FC switches (16 ports)",
      unit: 0, //A=9.1
      unitCost: 0, //B=9.1
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    FCSwitches32: {
      component: "FC switches (32 ports)",
      unit: 0, //A=9.2
      unitCost: 0, //B=9.2
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    total: {
      component: "Total Network Costs",
      unit: "NA", //A=sum of all above
      unitCost: "NA", //B=sum of all above
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
  });

  const [backupTable, setBackupTable] = useState({
    storedInCloud: {
      component: "Backup data stored in cloud",
      unit: 0, //A=11.2
      unitCost: 0, //B=11.2
      oneYearCost: 0, //C=(A*B*12)
      twoYearCost: 0, //D=(A*B*24)
      threeYearCost: 0, //E=(A*B*36)
    },
    storedInHDD: {
      component: "Backup data stored in HDD media in TB",
      unit: 0, //A=11.1
      unitCost: 0, //B=11.1
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    storedInTape: {
      component: "Backup data stored in tape",
      unit: 0, //A=11.3
      unitCost: 0, //B=11.3
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=C+15%
      threeYearCost: 0, //E=D+15%
    },
    total: {
      component: "Total Back Up Costs",
      unit: "NA",
      unitCost: "NA",
      oneYearCost: 0,
      twoYearCost: 0,
      threeYearCost: 0,
    },
  });

  const [manpowerTable, setManpowerTable] = useState({
    architects: {
      component: "Architects",
      unit: 0, //A=13.1
      unitCost: 0, //B=13.1
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=2C
      threeYearCost: 0, //E=3C
    },
    systemsEngineers: {
      component: "Systems Engineers",
      unit: 0, //A=13.3
      unitCost: 0, //B=13.3
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=2C
      threeYearCost: 0, //E=3C
    },
    administrators: {
      component: "Administrators",
      unit: 0, //A=13.2
      unitCost: 0, //B=13.2
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=2C
      threeYearCost: 0, //E=3C
    },
    total: {
      component: "Total cost of manpower",
      unit: "NA",
      unitCost: "NA",
      oneYearCost: 0, //C=(A*B)
      twoYearCost: 0, //D=2C
      threeYearCost: 0, //E=3C
    },
  });

  const [totalCostTable, setTotalCostTable] = useState({
    passiveComponents: {
      component: "Passive Components",
      oneYearCost: 0, //T1.2
      twoYearCost: 0, //T1.2
      threeYearCost: 0, //T1.2
    },
    activeComponents: {
      component: "Active components ",
      oneYearCost: 0, //T2 sum All
      twoYearCost: 0, //T2 sum All
      threeYearCost: 0, //T2 sum All
    },
    manpower: {
      component: "Manpower",
      oneYearCost: 0, //T3 Sum
      twoYearCost: 0, //T3 Sum
      threeYearCost: 0, //T3 Sum
    },
  });

  const [benchmarks, setBenchmarks] = useState({
    racks: {
      emergingAsia: [280, 250, 200],
      matureAsia: [280, 250, 200],
      emergingEurope: [800, 700, 600],
      matureEurope: [800, 700, 600],
      northAmerica: [800, 700, 600],
      latinAmerica: [280, 250, 200],
      china: [280, 250, 200],
      middleEastAndAfrica: [400, 350, 300],
    },
    cabinets: {
      emergingAsia: [15000, 13000, 12000],
      matureAsia: [15000, 13000, 12000],
      emergingEurope: [15000, 13000, 12000],
      matureEurope: [15000, 13000, 10000],
      northAmerica: [15000, 13000, 10000],
      latinAmerica: [15000, 13000, 12000],
      china: [12000, 11000, 10000],
      middleEastAndAfrica: [20000, 15000, 12000],
    },
    power: {
      emergingAsia: [0.15, 0.15, 0.13], //per Kwh
      matureAsia: [0.23, 0.21, 0.2],
      emergingEurope: [0.08, 0.08, 0.08],
      matureEurope: [0.18, 0.17, 0.17],
      northAmerica: [0.139, 0.137, 0.135],
      latinAmerica: [0.15, 0.15, 0.13],
      china: [0.094, 0.093, 0.092],
      middleEastAndAfrica: [0.07, 0.07, 0.06],
    },
    memory: {
      emergingAsia: [30, 28, 25], //per GB
      matureAsia: [28, 15, 20],
      emergingEurope: [30, 28, 25],
      matureEurope: [28, 25, 20],
      northAmerica: [28, 25, 20],
      latinAmerica: [30, 28, 25],
      china: [28, 25, 20],
      middleEastAndAfrica: [30, 28, 25],
    },
    cpu: {
      emergingAsia: [2600, 2400, 2300],
      matureAsia: [2500, 2400, 2200],
      emergingEurope: [2400, 2300, 2200],
      matureEurope: [2500, 2400, 2200],
      northAmerica: [2500, 2400, 2200],
      latinAmerica: [2800, 2700, 2200],
      china: [1800, 1600, 1500],
      middleEastAndAfrica: [2800, 2500, 2200],
    },
    hypervisor: {
      emergingAsia: [600, 2200, 2000],
      matureAsia: [600, 2200, 2000],
      emergingEurope: [600, 2200, 2000],
      matureEurope: [600, 2200, 2000],
      northAmerica: [600, 2200, 2000],
      latinAmerica: [600, 2200, 2000],
      china: [600, 2200, 2000],
      middleEastAndAfrica: [600, 2200, 2000],
    },
    flashStorage: {
      emergingAsia: [2200, 2000, 700],
      matureAsia: [1800, 1500, 600],
      emergingEurope: [2200, 2000, 700],
      matureEurope: [1800, 1500, 600],
      northAmerica: [1800, 1500, 600],
      latinAmerica: [2200, 2000, 700],
      china: [2200, 2000, 700],
      middleEastAndAfrica: [2200, 2000, 700],
    },
    HDDStorage: {
      emergingAsia: [600, 400, 250],
      matureAsia: [500, 400, 250],
      emergingEurope: [500, 400, 250],
      matureEurope: [500, 400, 250],
      northAmerica: [500, 400, 250],
      latinAmerica: [500, 400, 250],
      china: [500, 400, 250],
      middleEastAndAfrica: [600, 400, 250],
    },
    IPSwitches16: {
      emergingAsia: [350, 300, 250],
      matureAsia: [350, 300, 250],
      emergingEurope: [350, 300, 250],
      matureEurope: [350, 300, 250],
      northAmerica: [350, 300, 250],
      latinAmerica: [350, 300, 250],
      china: [350, 300, 250],
      middleEastAndAfrica: [350, 300, 250],
    },
    IPSwitches32: {
      emergingAsia: [18000, 16000, 15000],
      matureAsia: [18000, 16000, 15000],
      emergingEurope: [18000, 16000, 15000],
      matureEurope: [18000, 16000, 15000],
      northAmerica: [18000, 16000, 15000],
      latinAmerica: [18000, 16000, 15000],
      china: [18000, 16000, 15000],
      middleEastAndAfrica: [18000, 16000, 15000],
    },
    IPSwitches48: {
      emergingAsia: [18000, 16000, 15000],
      matureAsia: [18000, 16000, 15000],
      emergingEurope: [18000, 16000, 15000],
      matureEurope: [18000, 16000, 15000],
      northAmerica: [18000, 16000, 15000],
      latinAmerica: [18000, 16000, 15000],
      china: [18000, 16000, 15000],
      middleEastAndAfrica: [18000, 16000, 15000],
    },
    IPSwitches64: {
      emergingAsia: [20000, 17000, 15000],
      matureAsia: [20000, 17000, 15000],
      emergingEurope: [20000, 17000, 15000],
      matureEurope: [20000, 17000, 15000],
      northAmerica: [20000, 17000, 15000],
      latinAmerica: [20000, 17000, 15000],
      china: [20000, 17000, 15000],
      middleEastAndAfrica: [20000, 17000, 15000],
    },
    IPSwitches96: {
      emergingAsia: [30000, 25000, 20000],
      matureAsia: [30000, 25000, 20000],
      emergingEurope: [30000, 25000, 20000],
      matureEurope: [30000, 25000, 20000],
      northAmerica: [30000, 25000, 20000],
      latinAmerica: [30000, 25000, 20000],
      china: [30000, 25000, 20000],
      middleEastAndAfrica: [30000, 25000, 20000],
    },
    FCSwitches16: {
      emergingAsia: [13000, 13000, 13000],
      matureAsia: [13000, 13000, 13000],
      emergingEurope: [13000, 13000, 13000],
      matureEurope: [13000, 13000, 13000],
      northAmerica: [13000, 13000, 13000],
      latinAmerica: [13000, 13000, 13000],
      china: [13000, 13000, 13000],
      middleEastAndAfrica: [13000, 13000, 13000],
    },
    FCSwitches32: {
      emergingAsia: [20000, 20000, 20000],
      matureAsia: [20000, 20000, 20000],
      emergingEurope: [20000, 20000, 20000],
      matureEurope: [20000, 20000, 20000],
      northAmerica: [20000, 20000, 20000],
      latinAmerica: [20000, 20000, 20000],
      china: [20000, 20000, 20000],
      middleEastAndAfrica: [20000, 20000, 20000],
    },
    storedInHDD: {
      emergingAsia: [600, 400, 250],
      matureAsia: [500, 400, 250],
      emergingEurope: [500, 400, 250],
      matureEurope: [500, 400, 250],
      northAmerica: [500, 400, 250],
      latinAmerica: [500, 400, 250],
      china: [500, 400, 250],
      middleEastAndAfrica: [600, 400, 250],
    },
    storedInCloud: {
      emergingAsia: [23, 23, 23],
      matureAsia: [23, 23, 23],
      emergingEurope: [23, 23, 23],
      matureEurope: [23, 23, 23],
      northAmerica: [23, 23, 23],
      latinAmerica: [23, 23, 23],
      china: [23, 23, 23],
      middleEastAndAfrica: [23, 23, 23],
    },
    storedInTape: {
      emergingAsia: [15, 12, 10],
      matureAsia: [15, 12, 10],
      emergingEurope: [15, 12, 10],
      matureEurope: [15, 12, 10],
      northAmerica: [15, 12, 10],
      latinAmerica: [15, 12, 10],
      china: [15, 12, 10],
      middleEastAndAfrica: [15, 12, 10],
    },
  });

  useEffect(() => {
    crudService._getAll("countries?orderBy=sort_order&orderPos=ASC", []).then(
      (result) => {
        if ((result.status = 200)) {
          if (result.data) {
            let countryData = result.data.map((country) => ({
              label: country.name,
              value: country.id,
              regionId: country.group_id,
              regionName: country.group,
            }));
            setCountryList(countryData);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleRegionalCheck = (data) => {
    const {
      stateData,
      setState,
      componentName,
      event: { target },
    } = data;
    let newData = {};
    if (target.value < 0) {
      target.value = 0;
    }
    if (
      (target.tagName == undefined && target.checked) ||
      (target.tagName == "INPUT" && stateData.isBenchmarksChecked)
    ) {
      let tempValue =
        target.tagName == "INPUT"
          ? target.value
          : componentName
          ? stateData[componentName].unit
          : stateData.unit;
      if (componentName) {
        if (target.tagName == undefined && target.checked) {
          Object.keys(stateData).map((key, ind) => {
            if (stateData[key] instanceof Object) {
              newData = {
                ...newData,
                [key]: {
                  ...stateData[key],
                  ["cost"]: getBenchmarkValue(
                    stateData[key].unit,
                    stateData[key]
                  ),
                },
              };
            }
          });
        } else {
          newData = {
            ...newData,
            [componentName]: {
              ...stateData[componentName],
              ["cost"]: getBenchmarkValue(tempValue, stateData[componentName]),
            },
          };
        }
      } else {
        newData = {
          ...newData,
          ["cost"]: getBenchmarkValue(tempValue, stateData),
        };
      }
    }

    if (target.tagName == undefined && target.checked) {
      newData = { ...newData, [target.name]: target.checked };
    }
    if (target.tagName == undefined && !target.checked) {
      newData = { ...newData, [target.name]: target.checked };
      if (componentName) {
        Object.keys(stateData).map((key, ind) => {
          if (stateData[key] instanceof Object) {
            newData = {
              ...newData,
              [key]: {
                ...stateData[key],
                ["cost"]: 0,
              },
            };
          }
        });
      } else {
        newData = {
          ...newData,
          ["cost"]: 0,
        };
      }
    }
    if (target.tagName == "INPUT") {
      if (componentName) {
        newData = {
          [componentName]: {
            ...stateData[componentName],
            ...newData[componentName],
            [target.name]: target.value,
          },
        };
      } else {
        newData = {
          ...newData,
          [target.name]: target.value,
        };
      }
    }
    setState((previousState) => ({
      ...previousState,
      ...newData,
    }));

    if (stateData.componentKey == "racks") {
      let costPerKwh = 0.139;
      let tempValue = target.tagName == "INPUT" ? target.value : stateData.unit;
      if (
        (target.tagName == undefined && target.checked) ||
        (target.tagName == "INPUT" && stateData.isBenchmarksChecked)
      ) {
        costPerKwh = getBenchmarkValue(tempValue, powerState);
      }
      setPowerState((previousState) => ({
        ...previousState,
        numberOfRack: tempValue,
        contPerKwh: costPerKwh,
      }));
    }
  };

  useEffect(() => {
    const updateCostByRegion = (stateData, setState) => {
      if (stateData.isBenchmarksChecked) {
        let stateKeys = Object.keys(stateData).filter(
          (key) =>
            stateData[key] instanceof Object && !Array.isArray(stateData[key])
        );

        if (stateKeys && stateKeys.length) {
          stateKeys.map((key) => {
            setState((previousState) => ({
              ...previousState,
              [key]: {
                ...previousState[key],
                cost: getBenchmarkValue(stateData[key].unit, stateData[key]),
              },
            }));
          });
        } else {
          setState((previousState) => ({
            ...previousState,
            cost: getBenchmarkValue(stateData.unit, stateData),
          }));
        }
      }
    };
    updateCostByRegion(rackState, setRackState);
    updateCostByRegion(powerState, setPowerState);
    updateCostByRegion(cabinetState, setCabinetState);
    updateCostByRegion(memoryState, setMemoryState);
    updateCostByRegion(physicalCUPState, setPhysicalCUPState);
    updateCostByRegion(storageState, setStorageState);
    updateCostByRegion(ipSwitchesState, setIpSwitchesState);
    updateCostByRegion(fabricSwitchesState, setFabricSwitchesState);
    updateCostByRegion(hypervisorState, setHypervisorState);
    updateCostByRegion(backupStorageState, setBackupStorageState);
    updateCostByRegion(manpowerState, setManpowerState);
  }, [selectedCountry]);

  const getBenchmarkValue = (value, stateData) => {
    const regionKey = regionConfig[selectedCountry.regionId];
    const componentKey = stateData.componentKey;
    let rangIndex = 0;
    for (var i = 0; i < stateData.range.length; i++) {
      if (value <= stateData.range[i]) {
        rangIndex = i;
        break;
      } else if (i === stateData.range.length - 1) {
        rangIndex = i;
        break;
      }
    }
    // console.log(`benchmarks[${componentKey}][${regionKey}][${rangIndex}]`);
    return benchmarks[componentKey][regionKey][rangIndex];
  };

  // output calculation
  useEffect(() => {
    // Infrastructure Rack table
    const rackUnit = Number(rackState.unit);
    const rackCost = Number(rackState.cost);
    const rackOneYearCost = rackUnit * rackCost;
    const rackTwoYearCost = rackOneYearCost + (rackOneYearCost * 15) / 100;
    const rackThreeYearCost = rackTwoYearCost + (rackOneYearCost * 15) / 100;
    setInfrastructureRackTable((previousState) => ({
      ...previousState,
      ["numberOfRack"]: {
        ...previousState.numberOfRack,
        unit: rackUnit,
        unitCost: rackCost,
        oneYearCost: rackOneYearCost.toFixed(2),
        twoYearCost: rackTwoYearCost.toFixed(2),
        threeYearCost: rackThreeYearCost.toFixed(2),
      },
    }));

    // Infrastructure Power table
    const numberOfRack = Number(powerState.numberOfRack);
    const powerPerRack = Number(powerState.powerPerRack);
    const constPerKwh = Number(powerState.contPerKwh);
    const powerOneYearCost =
      numberOfRack * powerPerRack * 24 * 31 * 12 * constPerKwh;
    const powerTwoYearCost = 2 * powerOneYearCost;
    const powerThreeYearCost = 3 * powerOneYearCost;

    // const totalInfrastructureUnit = rackUnit + numberOfRack;
    // const totalInfrastructureCost = rackCost + constPerKwh;
    const totalInfrastructureOneYearCost = rackOneYearCost + powerOneYearCost;
    const totalInfrastructureTwoYearCost = rackTwoYearCost + powerTwoYearCost;
    const totalInfrastructureThreeYearCost =
      rackThreeYearCost + powerThreeYearCost;
    setInfrastructurePowerTable((previousState) => ({
      ...previousState,
      ["totalPower"]: {
        ...previousState.totalPower,
        numberOfRack: numberOfRack,
        constPerKwh: constPerKwh,
        oneYearCost: powerOneYearCost.toFixed(2),
        twoYearCost: powerTwoYearCost.toFixed(2),
        threeYearCost: powerThreeYearCost.toFixed(2),
      },
      ["totalOwnInfraCost"]: {
        ...previousState.totalOwnInfraCost,
        unit: numberOfRack,
        unitCost: "-",
        oneYearCost: totalInfrastructureOneYearCost.toFixed(2),
        twoYearCost: totalInfrastructureTwoYearCost.toFixed(2),
        threeYearCost: totalInfrastructureThreeYearCost.toFixed(2),
      },
    }));

    // colocation table
    const numberOfCabinets = Number(cabinetState.unit);
    const cabinetCost = Number(cabinetState.cost);
    const cabinetOneYearCost = numberOfCabinets * cabinetCost;
    const cabinetTwoYearCost = 2 * cabinetOneYearCost;
    const cabinetThreeYearCost = 3 * cabinetOneYearCost;
    setColocationTable((previousState) => ({
      ...previousState,
      ["numberOfCabinets"]: {
        ...previousState.numberOfCabinets,
        unit: numberOfCabinets,
        unitCostPerRackPerYear: cabinetCost,
        oneYearCost: cabinetOneYearCost.toFixed(2),
        twoYearCost: cabinetTwoYearCost.toFixed(2),
        threeYearCost: cabinetThreeYearCost.toFixed(2),
      },
    }));

    // compute cost calculation
    const memoryUnit = Number(memoryState.unit);
    const memoryCost = Number(memoryState.cost);
    const memoryOneYearCost = memoryUnit * memoryCost;
    const memoryTwoYearCost =
      memoryOneYearCost + (memoryOneYearCost * 15) / 100;
    const memoryThreeYearCost =
      memoryTwoYearCost + (memoryOneYearCost * 15) / 100;

    const physicalUnit = Number(physicalCUPState.unit);
    const physicalCost = Number(physicalCUPState.cost);
    const physicalOneYearCost = physicalUnit * physicalCost;
    const physicalTwoYearCost =
      physicalOneYearCost + (physicalOneYearCost * 15) / 100;
    const physicalThreeYearCost =
      physicalTwoYearCost + (physicalOneYearCost * 15) / 100;

    const hypervisorUnit = Number(hypervisorState.unit);
    const hypervisorCost = Number(hypervisorState.cost);
    const hypervisorOneYearCost = hypervisorUnit * hypervisorCost;
    const hypervisorTwoYearCost =
      hypervisorOneYearCost + (hypervisorOneYearCost * 15) / 100;
    const hypervisorThreeYearCost =
      hypervisorTwoYearCost + (hypervisorOneYearCost * 15) / 100;

    const infraUnit = Math.round(
      parseFloat((physicalCUPState.unit * computeCapacity) / 100),
      0
    );
    const infraCost = parseFloat(
      (physicalCUPState.cost * computeCapacity) / 100
    );
    const infraOneYearCost = infraUnit * infraCost;
    const infraTwoYearCost = infraOneYearCost + (infraOneYearCost * 15) / 100;
    const infraThreeYearCost = infraTwoYearCost + (infraOneYearCost * 15) / 100;

    const totalComputeCostUnit =
      parseFloat(memoryUnit) +
      parseFloat(physicalUnit) +
      parseFloat(hypervisorUnit) +
      parseFloat(infraUnit);
    const totalComputeCostCost =
      parseFloat(memoryCost) +
      parseFloat(physicalCost) +
      parseFloat(hypervisorCost) +
      parseFloat(infraCost);
    const totalComputeCostOneYearCost =
      memoryOneYearCost +
      physicalOneYearCost +
      hypervisorOneYearCost +
      infraOneYearCost;
    const totalComputeCostTwoYearCost =
      memoryTwoYearCost +
      physicalTwoYearCost +
      hypervisorTwoYearCost +
      infraTwoYearCost;
    const totalComputeCostThreeYearCost =
      memoryThreeYearCost +
      physicalThreeYearCost +
      hypervisorThreeYearCost +
      infraThreeYearCost;

    setComputeCostTable((previousState) => ({
      ...previousState,
      ["memory"]: {
        ...previousState.memory,
        unit: memoryUnit,
        unitCost: memoryCost,
        oneYearCost: memoryOneYearCost.toFixed(2),
        twoYearCost: memoryTwoYearCost.toFixed(2),
        threeYearCost: memoryThreeYearCost.toFixed(2),
      },
      ["physical"]: {
        ...previousState.physical,
        unit: physicalUnit,
        unitCost: physicalCost,
        oneYearCost: physicalOneYearCost.toFixed(2),
        twoYearCost: physicalTwoYearCost.toFixed(2),
        threeYearCost: physicalThreeYearCost.toFixed(2),
      },
      ["hypervisor"]: {
        ...previousState.hypervisor,
        unit: hypervisorUnit,
        unitCost: hypervisorCost,
        oneYearCost: hypervisorOneYearCost.toFixed(2),
        twoYearCost: hypervisorTwoYearCost.toFixed(2),
        threeYearCost: hypervisorThreeYearCost.toFixed(2),
      },
      ["constOfDR"]: {
        ...previousState.constOfDR,
        unit: infraUnit,
        // unitCost: infraCost,
        unitCost: physicalCost,
        oneYearCost: infraOneYearCost.toFixed(2),
        twoYearCost: infraTwoYearCost.toFixed(2),
        threeYearCost: infraThreeYearCost.toFixed(2),
      },
      ["total"]: {
        ...previousState.total,
        // unit: totalComputeCostUnit,
        // unitCost: totalComputeCostCost,
        oneYearCost: totalComputeCostOneYearCost.toFixed(2),
        twoYearCost: totalComputeCostTwoYearCost.toFixed(2),
        threeYearCost: totalComputeCostThreeYearCost.toFixed(2),
      },
    }));

    // Storage cost calculation
    const flashStorageUnit = Number(storageState["flashStorage"].unit);

    const flashStorageCost = Number(storageState["flashStorage"].cost);

    const flashStorageOneYearCost = flashStorageUnit * flashStorageCost;
    const flashStorageTwoYearCost =
      flashStorageOneYearCost + (flashStorageOneYearCost * 15) / 100;
    const flashStorageThreeYearCost =
      flashStorageTwoYearCost + (flashStorageOneYearCost * 15) / 100;

    const hddStorageUnit = Number(storageState["hddStorage"].unit);

    const hddStorageCost = Number(storageState["hddStorage"].cost);

    const hddStorageOneYearCost = hddStorageUnit * hddStorageCost;
    const hddStorageTwoYearCost =
      hddStorageOneYearCost + (hddStorageOneYearCost * 15) / 100;
    const hddStorageThreeYearCost =
      hddStorageTwoYearCost + (hddStorageOneYearCost * 15) / 100;

    const replicatedStorageUnit =
      (flashStorageUnit + hddStorageUnit) * replicationCopies;
    const replicatedStorageCost = (flashStorageCost + hddStorageCost) / 2;
    const replicatedStorageOneYearCost =
      replicatedStorageUnit * replicatedStorageCost;
    const replicatedStorageTwoYearCost =
      replicatedStorageOneYearCost + (replicatedStorageOneYearCost * 15) / 100;
    const replicatedStorageThreeYearCost =
      replicatedStorageTwoYearCost + (replicatedStorageOneYearCost * 15) / 100;

    const totalStorageUnit =
      flashStorageUnit + hddStorageUnit + replicatedStorageUnit;
    const totalStorageCost =
      flashStorageCost + hddStorageCost + replicatedStorageCost;

    const totalStorageOneYearCost =
      flashStorageOneYearCost +
      hddStorageOneYearCost +
      replicatedStorageOneYearCost;
    const totalStorageTwoYearCost =
      flashStorageTwoYearCost +
      hddStorageTwoYearCost +
      replicatedStorageTwoYearCost;
    const totalStorageThreeYearCost =
      flashStorageThreeYearCost +
      hddStorageThreeYearCost +
      replicatedStorageThreeYearCost;

    setStorageCostTable((previousState) => ({
      ...previousState,
      ["flashStorage"]: {
        ...previousState.flashStorage,
        unit: flashStorageUnit,
        unitCost: flashStorageCost,
        oneYearCost: flashStorageOneYearCost.toFixed(2),
        twoYearCost: flashStorageTwoYearCost.toFixed(2),
        threeYearCost: flashStorageThreeYearCost.toFixed(2),
      },
      ["HDDStorage"]: {
        ...previousState.HDDStorage,
        unit: hddStorageUnit,
        unitCost: hddStorageCost,
        oneYearCost: hddStorageOneYearCost.toFixed(2),
        twoYearCost: hddStorageTwoYearCost.toFixed(2),
        threeYearCost: hddStorageThreeYearCost.toFixed(2),
      },
      ["replicatedData"]: {
        ...previousState.replicatedData,
        unit: replicatedStorageUnit,
        unitCost: replicatedStorageCost,
        oneYearCost: replicatedStorageOneYearCost.toFixed(2),
        twoYearCost: replicatedStorageTwoYearCost.toFixed(2),
        threeYearCost: replicatedStorageThreeYearCost.toFixed(2),
      },
      ["storageCost"]: {
        ...previousState.storageCost,
        oneYearCost: totalStorageOneYearCost.toFixed(2),
        twoYearCost: totalStorageTwoYearCost.toFixed(2),
        threeYearCost: totalStorageThreeYearCost.toFixed(2),
      },
    }));

    // Network cost calculation
    const IPSwitches16Unit = Number(ipSwitchesState["switches16"].unit);

    const IPSwitches16Cost = Number(ipSwitchesState["switches16"].cost);

    const IPSwitches16OneYearCost = IPSwitches16Unit * IPSwitches16Cost;
    const IPSwitches16TwoYearCost =
      IPSwitches16OneYearCost + (IPSwitches16OneYearCost * 15) / 100;
    const IPSwitches16ThreeYearCost =
      IPSwitches16TwoYearCost + (IPSwitches16OneYearCost * 15) / 100;

    const IPSwitches32Unit = Number(ipSwitchesState["switches32"].unit);

    const IPSwitches32Cost = Number(ipSwitchesState["switches32"].cost);

    const IPSwitches32OneYearCost = IPSwitches32Unit * IPSwitches32Cost;
    const IPSwitches32TwoYearCost =
      IPSwitches32OneYearCost + (IPSwitches32OneYearCost * 15) / 100;
    const IPSwitches32ThreeYearCost =
      IPSwitches32TwoYearCost + (IPSwitches32OneYearCost * 15) / 100;

    const IPSwitches48Unit = Number(ipSwitchesState["switches48"].unit);

    const IPSwitches48Cost = Number(ipSwitchesState["switches48"].cost);

    const IPSwitches48OneYearCost = IPSwitches48Unit * IPSwitches48Cost;
    const IPSwitches48TwoYearCost =
      IPSwitches48OneYearCost + (IPSwitches48OneYearCost * 15) / 100;
    const IPSwitches48ThreeYearCost =
      IPSwitches48TwoYearCost + (IPSwitches48OneYearCost * 15) / 100;

    const IPSwitches64Unit = Number(ipSwitchesState["switches64"].unit);

    const IPSwitches64Cost = Number(ipSwitchesState["switches64"].cost);

    const IPSwitches64OneYearCost = IPSwitches64Unit * IPSwitches64Cost;
    const IPSwitches64TwoYearCost =
      IPSwitches64OneYearCost + (IPSwitches64OneYearCost * 15) / 100;
    const IPSwitches64ThreeYearCost =
      IPSwitches64TwoYearCost + (IPSwitches64OneYearCost * 15) / 100;

    const IPSwitches96Unit = Number(ipSwitchesState["switches96"].unit);

    const IPSwitches96Cost = Number(ipSwitchesState["switches96"].cost);

    const IPSwitches96OneYearCost = IPSwitches96Unit * IPSwitches96Cost;
    const IPSwitches96TwoYearCost =
      IPSwitches96OneYearCost + (IPSwitches96OneYearCost * 15) / 100;
    const IPSwitches96ThreeYearCost =
      IPSwitches96TwoYearCost + (IPSwitches96OneYearCost * 15) / 100;

    const FCSwitches16Unit = Number(fabricSwitchesState["switches16"].unit);

    const FCSwitches16Cost = Number(fabricSwitchesState["switches16"].cost);

    const FCSwitches16OneYearCost = FCSwitches16Unit * FCSwitches16Cost;
    const FCSwitches16TwoYearCost =
      FCSwitches16OneYearCost + (FCSwitches16OneYearCost * 15) / 100;
    const FCSwitches16ThreeYearCost =
      FCSwitches16TwoYearCost + (FCSwitches16OneYearCost * 15) / 100;

    const FCSwitches32Unit = Number(fabricSwitchesState["switches32"].unit);

    const FCSwitches32Cost = Number(fabricSwitchesState["switches32"].cost);

    const FCSwitches32OneYearCost = FCSwitches32Unit * FCSwitches32Cost;
    const FCSwitches32TwoYearCost =
      FCSwitches32OneYearCost + (FCSwitches32OneYearCost * 15) / 100;
    const FCSwitches32ThreeYearCost =
      FCSwitches32TwoYearCost + (FCSwitches32OneYearCost * 15) / 100;

    const totalNetworkUnit =
      IPSwitches16Unit +
      IPSwitches32Unit +
      IPSwitches48Unit +
      IPSwitches64Unit +
      IPSwitches96Unit +
      FCSwitches16Unit +
      FCSwitches32Unit;
    const totalNetworkCost =
      IPSwitches16Cost +
      IPSwitches32Cost +
      IPSwitches48Cost +
      IPSwitches64Cost +
      IPSwitches96Cost +
      FCSwitches16Cost +
      FCSwitches32Cost;
    const totalNetworkOneYearCost =
      IPSwitches16OneYearCost +
      IPSwitches32OneYearCost +
      IPSwitches48OneYearCost +
      IPSwitches64OneYearCost +
      IPSwitches96OneYearCost +
      FCSwitches16OneYearCost +
      FCSwitches32OneYearCost;
    const totalNetworkTwoYearCost =
      IPSwitches16TwoYearCost +
      IPSwitches32TwoYearCost +
      IPSwitches48TwoYearCost +
      IPSwitches64TwoYearCost +
      IPSwitches96TwoYearCost +
      FCSwitches16TwoYearCost +
      FCSwitches32TwoYearCost;
    const totalNetworkThreeYearCost =
      IPSwitches16ThreeYearCost +
      IPSwitches32ThreeYearCost +
      IPSwitches48ThreeYearCost +
      IPSwitches64ThreeYearCost +
      IPSwitches96ThreeYearCost +
      FCSwitches16ThreeYearCost +
      FCSwitches32ThreeYearCost;
    setNetworkCostTable((previousState) => ({
      ...previousState,
      ["IPSwitches16"]: {
        ...previousState.IPSwitches16,
        unit: IPSwitches16Unit,
        unitCost: IPSwitches16Cost,
        oneYearCost: IPSwitches16OneYearCost.toFixed(2),
        twoYearCost: IPSwitches16TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches16ThreeYearCost.toFixed(2),
      },
      ["IPSwitches32"]: {
        ...previousState.IPSwitches32,
        unit: IPSwitches32Unit,
        unitCost: IPSwitches32Cost,
        oneYearCost: IPSwitches32OneYearCost.toFixed(2),
        twoYearCost: IPSwitches32TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches32ThreeYearCost.toFixed(2),
      },
      ["IPSwitches48"]: {
        ...previousState.IPSwitches48,
        unit: IPSwitches48Unit,
        unitCost: IPSwitches48Cost,
        oneYearCost: IPSwitches48OneYearCost.toFixed(2),
        twoYearCost: IPSwitches48TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches48ThreeYearCost.toFixed(2),
      },
      ["IPSwitches64"]: {
        ...previousState.IPSwitches64,
        unit: IPSwitches64Unit,
        unitCost: IPSwitches64Cost,
        oneYearCost: IPSwitches64OneYearCost.toFixed(2),
        twoYearCost: IPSwitches64TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches64ThreeYearCost.toFixed(2),
      },
      ["IPSwitches96"]: {
        ...previousState.IPSwitches96,
        unit: IPSwitches96Unit,
        unitCost: IPSwitches96Cost,
        oneYearCost: IPSwitches96OneYearCost.toFixed(2),
        twoYearCost: IPSwitches96TwoYearCost.toFixed(2),
        threeYearCost: IPSwitches96ThreeYearCost.toFixed(2),
      },
      ["FCSwitches16"]: {
        ...previousState.FCSwitches16,
        unit: FCSwitches16Unit,
        unitCost: FCSwitches16Cost,
        oneYearCost: FCSwitches16OneYearCost.toFixed(2),
        twoYearCost: FCSwitches16TwoYearCost.toFixed(2),
        threeYearCost: FCSwitches16ThreeYearCost.toFixed(2),
      },
      ["FCSwitches32"]: {
        ...previousState.FCSwitches32,
        unit: FCSwitches32Unit,
        unitCost: FCSwitches32Cost,
        oneYearCost: FCSwitches32OneYearCost.toFixed(2),
        twoYearCost: FCSwitches32TwoYearCost.toFixed(2),
        threeYearCost: FCSwitches32ThreeYearCost.toFixed(2),
      },
      ["total"]: {
        ...previousState.total,
        // unit: totalNetworkUnit,
        // unitCost: totalNetworkCost,
        oneYearCost: totalNetworkOneYearCost.toFixed(2),
        twoYearCost: totalNetworkTwoYearCost.toFixed(2),
        threeYearCost: totalNetworkThreeYearCost.toFixed(2),
      },
    }));

    // Backup cost calculation
    const storedHDDUnit = Number(backupStorageState["storedInHDD"].unit);

    const storedHDDCost = Number(backupStorageState["storedInHDD"].cost);

    const storedHDDOneYearCost = storedHDDUnit * storedHDDCost;
    const storedHDDTwoYearCost =
      storedHDDOneYearCost + (storedHDDOneYearCost * 15) / 100;
    const storedHDDThreeYearCost =
      storedHDDTwoYearCost + (storedHDDOneYearCost * 15) / 100;

    const storedTapeUnit = Number(backupStorageState["storedInTape"].unit);
    const storedTapeCost = Number(backupStorageState["storedInTape"].cost);

    const storedTapeOneYearCost = storedTapeUnit * storedTapeCost;
    const storedTapeTwoYearCost =
      storedTapeOneYearCost + (storedTapeOneYearCost * 15) / 100;
    const storedTapeThreeYearCost =
      storedTapeTwoYearCost + (storedTapeOneYearCost * 15) / 100;

    const storedCloudUnit = Number(backupStorageState["storedInCloud"].unit);
    const storedCloudCost = Number(backupStorageState["storedInCloud"].cost);

    const storedCloudOneYearCost = storedCloudUnit * storedCloudCost * 12;
    const storedCloudTwoYearCost = storedCloudOneYearCost * 2;
    const storedCloudThreeYearCost = storedCloudOneYearCost * 3;

    const totalBackUpUnit = storedHDDUnit + storedTapeUnit + storedCloudUnit;
    const totalBackUpCost = storedHDDCost + storedTapeCost + storedCloudCost;
    const totalBackUpOneYearCost =
      storedHDDOneYearCost + storedTapeOneYearCost + storedCloudOneYearCost;
    const totalBackUpTwoYearCost =
      storedHDDTwoYearCost + storedTapeTwoYearCost + storedCloudTwoYearCost;
    const totalBackUpThreeYearCost =
      storedHDDThreeYearCost +
      storedTapeThreeYearCost +
      storedCloudThreeYearCost;
    setBackupTable((previousState) => ({
      ...previousState,
      ["storedInHDD"]: {
        ...previousState.storedInHDD,
        unit: storedHDDUnit,
        unitCost: storedHDDCost,
        oneYearCost: storedHDDOneYearCost.toFixed(2),
        twoYearCost: storedHDDTwoYearCost.toFixed(2),
        threeYearCost: storedHDDThreeYearCost.toFixed(2),
      },
      ["storedInCloud"]: {
        ...previousState.storedInCloud,
        unit: storedCloudUnit,
        unitCost: storedCloudCost,
        oneYearCost: storedCloudOneYearCost.toFixed(2),
        twoYearCost: storedCloudTwoYearCost.toFixed(2),
        threeYearCost: storedCloudThreeYearCost.toFixed(2),
      },
      ["storedInTape"]: {
        ...previousState.storedInTape,
        unit: storedTapeUnit,
        unitCost: storedTapeCost,
        oneYearCost: storedTapeOneYearCost.toFixed(2),
        twoYearCost: storedTapeTwoYearCost.toFixed(2),
        threeYearCost: storedTapeThreeYearCost.toFixed(2),
      },
      ["total"]: {
        ...previousState.total,
        unit: "NA",
        unitCost: "NA",
        oneYearCost: totalBackUpOneYearCost.toFixed(2),
        twoYearCost: totalBackUpTwoYearCost.toFixed(2),
        threeYearCost: totalBackUpThreeYearCost.toFixed(2),
      },
    }));
    // cost of manpower calculation T3
    const architectsUnit = Number(manpowerState["architects"].unit);
    const architectsCost = Number(manpowerState["architects"].cost);

    const architectsOneYearCost = architectsUnit * architectsCost;
    const architectsTwoYearCost = architectsOneYearCost * 2;
    const architectsThreeYearCost = architectsOneYearCost * 3;

    const administratorsUnit = Number(manpowerState["administrators"].unit);
    const administratorsCost = Number(manpowerState["administrators"].cost);

    const administratorsOneYearCost = administratorsUnit * administratorsCost;
    const administratorsTwoYearCost = administratorsOneYearCost * 2;
    const administratorsThreeYearCost = administratorsOneYearCost * 3;

    const systemEngineersUnit = Number(manpowerState["systemEngineers"].unit);
    const systemEngineersCost = Number(manpowerState["systemEngineers"].cost);

    const systemEngineersOneYearCost =
      systemEngineersUnit * systemEngineersCost;
    const systemEngineersTwoYearCost = systemEngineersOneYearCost * 2;
    const systemEngineersThreeYearCost = systemEngineersOneYearCost * 2;

    const totalManpowerUnit =
      architectsUnit + administratorsUnit + systemEngineersUnit;
    const totalManpowerCost =
      architectsCost + administratorsCost + systemEngineersCost;
    const totalManpowerOneYearCost =
      architectsOneYearCost +
      administratorsOneYearCost +
      systemEngineersOneYearCost;
    const totalManpowerTwoYearCost =
      architectsTwoYearCost +
      administratorsTwoYearCost +
      systemEngineersTwoYearCost;
    const totalManpowerThreeYearCost =
      architectsThreeYearCost +
      administratorsThreeYearCost +
      systemEngineersThreeYearCost;

    setManpowerTable((previousState) => ({
      ...previousState,
      ["architects"]: {
        ...previousState.architects,
        unit: architectsUnit,
        unitCost: architectsCost,
        oneYearCost: architectsOneYearCost.toFixed(2),
        twoYearCost: architectsTwoYearCost.toFixed(2),
        threeYearCost: architectsThreeYearCost.toFixed(2),
      },
      ["administrators"]: {
        ...previousState.administrators,
        unit: administratorsUnit,
        unitCost: administratorsCost,
        oneYearCost: administratorsOneYearCost.toFixed(2),
        twoYearCost: administratorsTwoYearCost.toFixed(2),
        threeYearCost: administratorsThreeYearCost.toFixed(2),
      },
      ["systemsEngineers"]: {
        ...previousState.systemsEngineers,
        unit: systemEngineersUnit,
        unitCost: systemEngineersCost,
        oneYearCost: systemEngineersOneYearCost.toFixed(2),
        twoYearCost: systemEngineersTwoYearCost.toFixed(2),
        threeYearCost: systemEngineersThreeYearCost.toFixed(2),
      },
      ["total"]: {
        ...previousState.total,
        oneYearCost: totalManpowerOneYearCost.toFixed(2),
        twoYearCost: totalManpowerTwoYearCost.toFixed(2),
        threeYearCost: totalManpowerThreeYearCost.toFixed(2),
      },
    }));
    // total Cost Calculation
    let passiveComponentsOneYearCost = 0;
    let passiveComponentsTwoYearCost = 0;
    let passiveComponentsThreeYearCost = 0;
    if (colocationStatus.value == 1) {
      passiveComponentsOneYearCost = cabinetOneYearCost;
      passiveComponentsTwoYearCost = cabinetTwoYearCost;
      passiveComponentsThreeYearCost = cabinetThreeYearCost;
    } else {
      passiveComponentsOneYearCost = totalInfrastructureOneYearCost;
      passiveComponentsTwoYearCost = totalInfrastructureTwoYearCost;
      passiveComponentsThreeYearCost = totalInfrastructureThreeYearCost;
    }

    const activeComponentsOneYearCost =
      totalComputeCostOneYearCost +
      totalStorageOneYearCost +
      totalNetworkOneYearCost +
      totalBackUpOneYearCost;
    const activeComponentsTwoYearCost =
      totalComputeCostTwoYearCost +
      totalStorageTwoYearCost +
      totalNetworkTwoYearCost +
      totalBackUpTwoYearCost;
    const activeComponentsThreeYearCost =
      totalComputeCostThreeYearCost +
      totalStorageThreeYearCost +
      totalNetworkThreeYearCost +
      totalBackUpThreeYearCost;
    setTotalCostTable((previousState) => ({
      ...previousState,
      ["passiveComponents"]: {
        ...previousState.passiveComponents,
        oneYearCost: passiveComponentsOneYearCost.toFixed(2),
        twoYearCost: passiveComponentsTwoYearCost.toFixed(2),
        threeYearCost: passiveComponentsThreeYearCost.toFixed(2),
      },
      ["activeComponents"]: {
        ...previousState.activeComponents,
        oneYearCost: activeComponentsOneYearCost.toFixed(2),
        twoYearCost: activeComponentsTwoYearCost.toFixed(2),
        threeYearCost: activeComponentsThreeYearCost.toFixed(2),
      },
      ["manpower"]: {
        ...previousState.manpower,
        oneYearCost: totalManpowerOneYearCost.toFixed(2),
        twoYearCost: totalManpowerTwoYearCost.toFixed(2),
        threeYearCost: totalManpowerThreeYearCost.toFixed(2),
      },
    }));
  }, [
    rackState,
    cabinetState,
    memoryState,
    physicalCUPState,
    hypervisorState,
    computeCapacity,
    replicationCopies,
    storageState,
    ipSwitchesState,
    fabricSwitchesState,
    manpowerState,
  ]);

  const numberFormat = (value) => {
    if (isNaN(value)) {
      return value;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Container>
      <div className="DataCenterCalculatorContainer">
        <h5 className="heading">Data Center Cost Calculator</h5>
        <div
          className="countryContainer"
          style={{ display: currentQuestion === 1 ? "" : "none" }}
        >
          <div>
            <p className="flexTitle">Select your Country</p>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              // defaultValue={colourOptions[0]}
              // isDisabled={true}
              // isClearable={true}
              value={selectedCountry}
              isSearchable={true}
              name="country"
              options={countryList}
              onChange={setSelectedCountry}
              placeholder="Select Country"
            />
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div
          className="countryContainer"
          style={{ display: currentQuestion === 2 ? "" : "none" }}
        >
          <div>
            <p className="flexTitle">colocation facility?</p>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              // defaultValue={colourOptions[0]}
              // isDisabled={true}
              // isClearable={true}
              value={colocationStatus}
              isSearchable={false}
              name="colocation"
              options={[
                { value: 1, label: "Yes" },
                { value: 0, label: "No" },
              ]}
              placeholder="Select Colocation Facility"
              onChange={(data) => setColocationStatus(data)}
            />
          </div>
        </div>
        <div>
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 3 ? "" : "none" }}
          >
            <p className="flexTitle">
              How many cabinets are you using in the colocation facility?
            </p>

            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  disabled={!colocationStatus.value}
                  checked={cabinetState.isBenchmarksChecked}
                  name="isBenchmarksChecked"
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "",
                      event,
                      stateData: cabinetState,
                      setState: setCabinetState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">Number of Cabinets</label>
                <input
                  className={
                    colocationStatus.value ? "greyedOutInActive" : "greyedOut"
                  }
                  type="number"
                  placeholder="Number of cabinets"
                  name="unit"
                  disabled={!colocationStatus.value}
                  value={cabinetState.unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: cabinetState,
                      setState: setCabinetState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">
                  Unit cost of each cabinet per year in $
                </label>
                <input
                  className={
                    colocationStatus.value && !cabinetState.isBenchmarksChecked
                      ? "greyedOutInActive"
                      : "greyedOut"
                  }
                  type="number"
                  placeholder="unit cost of each cabinet per year in $"
                  name="const"
                  value={cabinetState.cost}
                  disabled={
                    !colocationStatus.value || cabinetState.isBenchmarksChecked
                  }
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: cabinetState,
                      setState: setCabinetState,
                    })
                  }
                />
              </div>
            </div>

            <p className="flexTitle">
              Select number of racks in your data center.
            </p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  disabled={colocationStatus.value}
                  checked={rackState.isBenchmarksChecked}
                  name="isBenchmarksChecked"
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: rackState,
                      setState: setRackState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">Number of racks</label>
                <input
                  className={
                    colocationStatus.value ? "greyedOut" : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Number of racks"
                  disabled={colocationStatus.value}
                  name="unit"
                  value={rackState.unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: rackState,
                      setState: setRackState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">
                  Unit Cost of each rack in $
                </label>
                <input
                  className={
                    colocationStatus.value || rackState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit Cost of each rack in $"
                  disabled={
                    colocationStatus.value || rackState.isBenchmarksChecked
                  }
                  name="cost"
                  value={rackState.cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: rackState,
                      setState: setRackState,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 4 ? "" : "none" }}
          >
            <p className="flexTitle">
              Select total memory from all applications (Consider three-year
              growth and node redundancy)
            </p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  checked={memoryState.isBenchmarksChecked}
                  name="isBenchmarksChecked"
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: memoryState,
                      setState: setMemoryState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">Total Memory in GB</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Total Memory in GB"
                  name="unit"
                  value={memoryState.unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: memoryState,
                      setState: setMemoryState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit Cost per GB in $</label>
                <input
                  className={
                    memoryState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit Cost per GB in $"
                  disabled={memoryState.isBenchmarksChecked}
                  name="cost"
                  value={memoryState.cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: memoryState,
                      setState: setMemoryState,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*  */}

          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 5 ? "" : "none" }}
          >
            <p className="flexTitle">
              Select number of physical CPUs (Consider three-year growth and
              node redundancy)
            </p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  checked={physicalCUPState.isBenchmarksChecked}
                  name="isBenchmarksChecked"
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: physicalCUPState,
                      setState: setPhysicalCUPState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">Number of CPUs</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of CPUs 100 - "
                  name="unit"
                  value={physicalCUPState.unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: physicalCUPState,
                      setState: setPhysicalCUPState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per CPUs in $</label>
                <input
                  className={
                    physicalCUPState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per CPUs in $"
                  disabled={physicalCUPState.isBenchmarksChecked}
                  name="cost"
                  value={physicalCUPState.cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      event,
                      stateData: physicalCUPState,
                      setState: setPhysicalCUPState,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 6 ? "" : "none" }}
          >
            <p className="flexTitle">Select total TB of storage</p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  name="isBenchmarksChecked"
                  checked={storageState.isBenchmarksChecked}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "flashStorage",
                      event,
                      stateData: storageState,
                      setState: setStorageState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">Flash storage in TB</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Flash storage in TB"
                  name="unit"
                  value={storageState["flashStorage"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "flashStorage",
                      event,
                      stateData: storageState,
                      setState: setStorageState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">
                  Unit cost per TB of Flash Storage in $
                </label>
                <input
                  className={
                    storageState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per TB of Flash Storage in $"
                  disabled={storageState.isBenchmarksChecked}
                  name="cost"
                  value={storageState["flashStorage"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "flashStorage",
                      event,
                      stateData: storageState,
                      setState: setStorageState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">HDD storage in TB</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="HDD storage in TB"
                  name="unit"
                  value={storageState["hddStorage"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "hddStorage",
                      event,
                      stateData: storageState,
                      setState: setStorageState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">
                  Unit cost per TB of HDD storage in $
                </label>
                <input
                  className={
                    storageState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per TB of HDD storage in $"
                  disabled={storageState.isBenchmarksChecked}
                  name="cost"
                  value={storageState["hddStorage"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "hddStorage",
                      event,
                      stateData: storageState,
                      setState: setStorageState,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 7 ? "" : "none" }}
          >
            <p className="flexTitle">Select total number IP switches</p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  name="isBenchmarksChecked"
                  checked={ipSwitchesState.isBenchmarksChecked}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "isBenchmarksChecked",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of IP switches (16 ports)
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of IP switches (16 ports)"
                  name="unit"
                  value={ipSwitchesState["switches16"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches16",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per switch in $</label>
                <input
                  className={
                    ipSwitchesState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per switch in $"
                  disabled={ipSwitchesState.isBenchmarksChecked}
                  name="cost"
                  value={ipSwitchesState["switches16"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches16",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of IP switches (32 ports)
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of IP switches (32 ports)"
                  name="unit"
                  value={ipSwitchesState["switches32"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches32",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per switch in $</label>
                <input
                  className={
                    ipSwitchesState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per switch in $"
                  disabled={ipSwitchesState.isBenchmarksChecked}
                  name="cost"
                  value={ipSwitchesState["switches32"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches32",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of IP switches (48 ports)
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of IP switches (48 ports)"
                  name="unit"
                  value={ipSwitchesState["switches48"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches48",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per switch in $</label>
                <input
                  className={
                    ipSwitchesState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per switch in $"
                  disabled={ipSwitchesState.isBenchmarksChecked}
                  name="cost"
                  value={ipSwitchesState["switches48"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches48",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of IP switches (64 ports)
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of IP switches (64 ports)"
                  name="unit"
                  value={ipSwitchesState["switches64"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches64",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per switch in $</label>
                <input
                  className={
                    ipSwitchesState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per switch in $"
                  disabled={ipSwitchesState.isBenchmarksChecked}
                  name="cost"
                  value={ipSwitchesState["switches64"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches64",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of IP switches (96 ports)
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder=""
                  name="unit"
                  value={ipSwitchesState["switches96"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches96",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per switch in $</label>
                <input
                  className={
                    ipSwitchesState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per switch in $"
                  disabled={ipSwitchesState.isBenchmarksChecked}
                  name="cost"
                  value={ipSwitchesState["switches96"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches96",
                      event,
                      stateData: ipSwitchesState,
                      setState: setIpSwitchesState,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 8 ? "" : "none" }}
          >
            <p className="flexTitle">Select total number SAN fabric switches</p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  name="isBenchmarksChecked"
                  checked={fabricSwitchesState.isBenchmarksChecked}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "isBenchmarksChecked",
                      event,
                      stateData: fabricSwitchesState,
                      setState: setFabricSwitchesState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of FC switches (16 ports)
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of FC switches (16 ports)"
                  name="unit"
                  value={fabricSwitchesState["switches16"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches16",
                      event,
                      stateData: fabricSwitchesState,
                      setState: setFabricSwitchesState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per switch in $</label>
                <input
                  disabled={fabricSwitchesState.isBenchmarksChecked}
                  className={
                    fabricSwitchesState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per switch in $"
                  name="cost"
                  value={fabricSwitchesState["switches16"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches16",
                      event,
                      stateData: fabricSwitchesState,
                      setState: setFabricSwitchesState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of FC switches (32 ports)
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of FC switches (32 ports)"
                  name="unit"
                  value={fabricSwitchesState["switches32"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches32",
                      event,
                      stateData: fabricSwitchesState,
                      setState: setFabricSwitchesState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per switch in $</label>
                <input
                  className={
                    fabricSwitchesState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  disabled={fabricSwitchesState.isBenchmarksChecked}
                  type="number"
                  placeholder="Unit cost per switch in $"
                  name="cost"
                  value={fabricSwitchesState["switches32"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "switches32",
                      event,
                      stateData: fabricSwitchesState,
                      setState: setFabricSwitchesState,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 9 ? "" : "none" }}
          >
            <p className="flexTitle">
              Select number of hypervisor socket licenses required?
            </p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  name="isBenchmarksChecked"
                  checked={hypervisorState.isBenchmarksChecked}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "",
                      event,
                      stateData: hypervisorState,
                      setState: setHypervisorState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Number of hypervisor licenses
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of hypervisor licenses"
                  name="unit"
                  value={hypervisorState.unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "",
                      event,
                      stateData: hypervisorState,
                      setState: setHypervisorState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">
                  Unit cost per socket license in $
                </label>
                <input
                  className={
                    hypervisorState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per socket license in $"
                  disabled={hypervisorState.isBenchmarksChecked}
                  name="cost"
                  value={hypervisorState.cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "",
                      event,
                      stateData: hypervisorState,
                      setState: setHypervisorState,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 10 ? "" : "none" }}
          >
            <p className="flexTitle">
              How many Terabytes of backup storage do you require? It is
              recommended to have at least three copies of your data, two local
              (on-site) but on different media (read: devices), and at least one
              copy off-site
            </p>
            <div className="checkBoxContainer">
              <div></div>
              <div>
                <Checkbox
                  style={{ marginLeft: "305px" }}
                  className="flexTitle"
                  name="isBenchmarksChecked"
                  checked={backupStorageState.isBenchmarksChecked}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "isBenchmarksChecked",
                      event,
                      stateData: backupStorageState,
                      setState: setBackupStorageState,
                    })
                  }
                >
                  Use regional benchmarks.
                </Checkbox>
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Total deduplicated storage (in TB) stored in HDD media
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Total deduplicated storage (in TB) stored in HDD media"
                  name="unit"
                  value={backupStorageState["storedInHDD"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "storedInHDD",
                      event,
                      stateData: backupStorageState,
                      setState: setBackupStorageState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit cost per TB in $</label>
                <input
                  className={
                    backupStorageState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per TB in $"
                  disabled={backupStorageState.isBenchmarksChecked}
                  name="cost"
                  value={backupStorageState["storedInHDD"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "storedInHDD",
                      event,
                      stateData: backupStorageState,
                      setState: setBackupStorageState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Total deduplicated storage (in TB) stored in cloud.
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Total deduplicated storage (in TB) stored in cloud."
                  name="unit"
                  value={backupStorageState["storedInCloud"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "storedInCloud",
                      event,
                      stateData: backupStorageState,
                      setState: setBackupStorageState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">
                  Unit cost per TB in $ per month
                </label>
                <input
                  className={
                    backupStorageState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit cost per TB in $ per month"
                  disabled={backupStorageState.isBenchmarksChecked}
                  name="cost"
                  value={backupStorageState["storedInCloud"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "storedInCloud",
                      event,
                      stateData: backupStorageState,
                      setState: setBackupStorageState,
                    })
                  }
                />
              </div>
            </div>
            <div className="inputBoxContainer">
              <div>
                <label className="placeholder">
                  Total deduplicated storage (in TB) stored in tape.
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Total deduplicated storage (in TB) stored in tape."
                  name="unit"
                  value={backupStorageState["storedInTape"].unit}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "storedInTape",
                      event,
                      stateData: backupStorageState,
                      setState: setBackupStorageState,
                    })
                  }
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <label className="placeholder">Unit Cost per TB in $</label>
                <input
                  className={
                    backupStorageState.isBenchmarksChecked
                      ? "greyedOut"
                      : "greyedOutInActive"
                  }
                  type="number"
                  placeholder="Unit Cost per TB in $"
                  disabled={backupStorageState.isBenchmarksChecked}
                  name="cost"
                  value={backupStorageState["storedInTape"].cost}
                  onChange={(event) =>
                    handleRegionalCheck({
                      componentName: "storedInTape",
                      event,
                      stateData: backupStorageState,
                      setState: setBackupStorageState,
                    })
                  }
                />
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 11 ? "" : "none" }}
          >
            <p className="flexTitle">
              Select number of replication copies for the purpose of disaster
              recovery?
            </p>
            <div className="inputDiv">
              <div className="checkBox">
                <select
                  style={{ marginTop: "20px" }}
                  onChange={(data) => setReplicationCopies(data.target.value)}
                  value={replicationCopies}
                  className="flexInput greyedOutInActive"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 12 ? "" : "none" }}
          >
            <p className="flexTitle">
              At what percentage of compute capacity will disaster recover site
              run relative to the primary data center?
            </p>
            <div className="inputDiv">
              <div className="checkBox" style={{ width: "100%" }}>
                <Slider
                  style={{ marginTop: "20px" }}
                  marks={videoQualityData}
                  step={null}
                  defaultValue={computeCapacity}
                  tooltipVisible={false}
                  onChange={setComputeCapacity}
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div
            className="questionsContainer"
            style={{ display: currentQuestion === 13 ? "" : "none" }}
          >
            <p className="flexTitle">
              Number of Full Time Employees. (As a reference, use 50VMs plus
              250TB managed per FTE infrastructure admin)
            </p>
            <div className="inputDiv">
              <div style={{ display: "unset" }}>
                <label className="placeholder">Number of architects</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of architects"
                  name="unit"
                  value={manpowerState["architects"].unit}
                  onChange={(event) =>
                    setManpowerState((previousState) => ({
                      ...previousState,
                      ["architects"]: {
                        ...previousState.architects,
                        [event.target.name]: event.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div style={{ display: "unset", marginLeft: "50px" }}>
                <label className="placeholder">Price per resource in $</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Price per resource in $"
                  name="cost"
                  value={manpowerState["architects"].cost}
                  onChange={(event) =>
                    setManpowerState((previousState) => ({
                      ...previousState,
                      ["architects"]: {
                        ...previousState.architects,
                        [event.target.name]: event.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
            <div className="inputDiv">
              <div style={{ display: "unset" }}>
                <label className="placeholder">
                  Number of infrastructure admins
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of infrastructure admins"
                  name="unit"
                  value={manpowerState["systemEngineers"].unit}
                  onChange={(event) =>
                    setManpowerState((previousState) => ({
                      ...previousState,
                      ["systemEngineers"]: {
                        ...previousState.systemEngineers,
                        [event.target.name]: event.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div style={{ display: "unset", marginLeft: "50px" }}>
                <label className="placeholder">Price per resource in $</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Price per resource in $"
                  name="cost"
                  value={manpowerState["systemEngineers"].cost}
                  onChange={(event) =>
                    setManpowerState((previousState) => ({
                      ...previousState,
                      ["systemEngineers"]: {
                        ...previousState.systemEngineers,
                        [event.target.name]: event.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
            <div className="inputDiv">
              <div style={{ display: "unset" }}>
                <label className="placeholder">
                  Number of system engineers
                </label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Number of system engineers"
                  name="unit"
                  value={manpowerState["administrators"].unit}
                  onChange={(event) =>
                    setManpowerState((previousState) => ({
                      ...previousState,
                      ["administrators"]: {
                        ...previousState.administrators,
                        [event.target.name]: event.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div style={{ display: "unset", marginLeft: "50px" }}>
                <label className="placeholder">Price per resource in $</label>
                <input
                  className="greyedOutInActive"
                  type="number"
                  placeholder="Price per resource in $"
                  name="cost"
                  value={manpowerState["administrators"].cost}
                  onChange={(event) =>
                    setManpowerState((previousState) => ({
                      ...previousState,
                      ["administrators"]: {
                        ...previousState.administrators,
                        [event.target.name]: event.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
          {/*  */}
        </div>

        {/* Output */}
        {/* Table1 */}
        <div style={{ display: currentQuestion === 14 ? "" : "none" }}>
          <h4 className="resultHeading">Calculation Result</h4>
          <div className="rack-table">
            <div className="heading">
              <h4>On-premise Infrastructure</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th colSpan={2}>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(infrastructureRackTable).map((key, index) => (
                  <tr key={index}>
                    <td>{infrastructureRackTable[key].component}</td>
                    <td>{infrastructureRackTable[key].unit}</td>
                    <td colSpan={2}>
                      {numberFormat(infrastructureRackTable[key].unitCost)}
                    </td>
                    <td>
                      {numberFormat(infrastructureRackTable[key].oneYearCost)}
                    </td>
                    <td>
                      {numberFormat(infrastructureRackTable[key].twoYearCost)}
                    </td>
                    <td>
                      {numberFormat(infrastructureRackTable[key].threeYearCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Number of racks</th>
                  <th>Power of rack</th>
                  <th>Cost per KwH</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(infrastructurePowerTable).map((key, index) => {
                  if (key != "totalOwnInfraCost") {
                    return (
                      <tr key={index}>
                        <td>{infrastructurePowerTable[key].component}</td>
                        <td>{infrastructurePowerTable[key].numberOfRack}</td>
                        <td>{infrastructurePowerTable[key].powerPerRack} KW</td>
                        <td>
                          {numberFormat(
                            infrastructurePowerTable[key].constPerKwh
                          )}
                        </td>
                        <td>
                          {numberFormat(
                            infrastructurePowerTable[key].oneYearCost
                          )}
                        </td>
                        <td>
                          {numberFormat(
                            infrastructurePowerTable[key].twoYearCost
                          )}
                        </td>
                        <td>
                          {numberFormat(
                            infrastructurePowerTable[key].threeYearCost
                          )}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index} className="lastChind">
                        <td>{infrastructurePowerTable[key].component}</td>
                        <td>{infrastructurePowerTable[key].unit}</td>
                        <td colSpan={2}>
                          {numberFormat(infrastructurePowerTable[key].unitCost)}
                        </td>
                        <td>
                          {numberFormat(
                            infrastructurePowerTable[key].oneYearCost
                          )}
                        </td>
                        <td>
                          {numberFormat(
                            infrastructurePowerTable[key].twoYearCost
                          )}
                        </td>
                        <td>
                          {numberFormat(
                            infrastructurePowerTable[key].threeYearCost
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
          <div className="colocation-table">
            <div className="heading">
              <br />
              <h4>OR</h4>
              <h4>Colocation</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost per rack per year</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(colocationTable).map((key, index) => (
                  <tr key={index}>
                    <td>{colocationTable[key].component}</td>
                    <td>{colocationTable[key].unit}</td>
                    <td>
                      {numberFormat(
                        colocationTable[key].unitCostPerRackPerYear
                      )}
                    </td>
                    <td>{numberFormat(colocationTable[key].oneYearCost)}</td>
                    <td>{numberFormat(colocationTable[key].twoYearCost)}</td>
                    <td>{numberFormat(colocationTable[key].threeYearCost)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="compute-cost-table">
            <div className="heading">
              <h4>Compute Cost</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(computeCostTable).map((key, index) => (
                  <tr className="lastChind" key={index}>
                    <td>{computeCostTable[key].component}</td>
                    <td>{computeCostTable[key].unit}</td>
                    <td>{numberFormat(computeCostTable[key].unitCost)}</td>
                    <td>{numberFormat(computeCostTable[key].oneYearCost)}</td>
                    <td>{numberFormat(computeCostTable[key].twoYearCost)}</td>
                    <td>{numberFormat(computeCostTable[key].threeYearCost)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="storage-cost-table">
            <div className="heading">
              <h4>Storage Cost</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(storageCostTable).map((key, index) => (
                  <tr className="lastChind" key={index}>
                    <td>{storageCostTable[key].component}</td>
                    <td>{storageCostTable[key].unit}</td>
                    <td>{numberFormat(storageCostTable[key].unitCost)}</td>
                    <td>{numberFormat(storageCostTable[key].oneYearCost)}</td>
                    <td>{numberFormat(storageCostTable[key].twoYearCost)}</td>
                    <td>{numberFormat(storageCostTable[key].threeYearCost)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="network-cost-table">
            <div className="heading">
              <h4>Network Cost</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(networkCostTable).map((key, index) => (
                  <tr className="lastChind" key={index}>
                    <td>{networkCostTable[key].component}</td>
                    <td>{networkCostTable[key].unit}</td>
                    <td>{numberFormat(networkCostTable[key].unitCost)}</td>
                    <td>{numberFormat(networkCostTable[key].oneYearCost)}</td>
                    <td>{numberFormat(networkCostTable[key].twoYearCost)}</td>
                    <td>{numberFormat(networkCostTable[key].threeYearCost)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="backup-table">
            <div className="heading">
              <h4>Backup</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units in TB</th>
                  <th>Unit Cost in TB per month</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(backupTable).map((key, index) => {
                  console.log("backupTable", backupTable[key]);
                  if (key == "storedInCloud") {
                    return (
                      <Fragment>
                        <tr key={index}>
                          <td>{backupTable[key].component}</td>
                          <td>{backupTable[key].unit}</td>
                          <td>{numberFormat(backupTable[key].unitCost)}</td>
                          <td>{numberFormat(backupTable[key].oneYearCost)}</td>
                          <td>{numberFormat(backupTable[key].twoYearCost)}</td>
                          <td>
                            {numberFormat(backupTable[key].threeYearCost)}
                          </td>
                        </tr>
                        <tr>
                          <th>Component</th>
                          <th>Units in TB</th>
                          <th>Unit Cost per TB</th>
                          <th>One-year TCO</th>
                          <th>Two-year TCO</th>
                          <th>Three-year TCO</th>
                        </tr>
                      </Fragment>
                    );
                  } else {
                    return (
                      <tr className="lastChind" key={index}>
                        <td>{backupTable[key].component}</td>
                        <td>{backupTable[key].unit}</td>
                        <td>{numberFormat(backupTable[key].unitCost)}</td>
                        <td>{numberFormat(backupTable[key].oneYearCost)}</td>
                        <td>{numberFormat(backupTable[key].twoYearCost)}</td>
                        <td>{numberFormat(backupTable[key].threeYearCost)}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
          <div className="manpower-table">
            <div className="heading">
              <h4>Total cost of manpower</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Units (number of employees)</th>
                  <th>Unit Cost</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(manpowerTable).map((key, index) => (
                  <tr className="lastChind" key={index}>
                    <td>{manpowerTable[key].component}</td>
                    <td>{manpowerTable[key].unit}</td>
                    <td>{numberFormat(manpowerTable[key].unitCost)}</td>
                    <td>{numberFormat(manpowerTable[key].oneYearCost)}</td>
                    <td>{numberFormat(manpowerTable[key].twoYearCost)}</td>
                    <td>{numberFormat(manpowerTable[key].threeYearCost)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="total-cost-table">
            <div className="heading">
              <h4>Total Costs</h4>
            </div>
            <Divider dashed />
            <Table responsive>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>One-year TCO</th>
                  <th>Two-year TCO</th>
                  <th>Three-year TCO</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(totalCostTable).map((key, index) => (
                  <tr key={index}>
                    <td>{totalCostTable[key].component}</td>
                    <td>{numberFormat(totalCostTable[key].oneYearCost)}</td>
                    <td>{numberFormat(totalCostTable[key].twoYearCost)}</td>
                    <td>{numberFormat(totalCostTable[key].threeYearCost)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <BrowserView>
          <div className="button-wrapper">
            <ButtonGroup>
              {/* <Button
                type="button"
                color="secondary"
                hidden={currentQuestion == 1 ? true : false}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Back
              </Button>
              <Button
                type="button"
                color="secondary"
                hidden={currentQuestion >= 14 ? true : false}
                onClick={() => {
                  setCurrentQuestion(currentQuestion + 1);
                }}
                style={{ marginLeft: currentQuestion === 1 ? "0px" : "" }}
              >
                Next
              </Button> */}
              <div
                type="button"
                className="custom-btn with-bg"
                hidden={currentQuestion == 1 ? true : false}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Back
              </div>
              <div
                type="button"
                className="custom-btn with-bg"
                hidden={currentQuestion >= 14 ? true : false}
                onClick={() => {
                  setCurrentQuestion(currentQuestion + 1);
                }}
                style={{ marginLeft: currentQuestion === 1 ? "0px" : "" }}
              >
                Next
              </div>
            </ButtonGroup>
          </div>
        </BrowserView>
        <MobileView>
          <div
            className="site-btn margin"
            style={{
              display: "flex",
              justifyContent: currentQuestion == 1 ? "end" : "space-between",
            }}
          >
            <Button
              className={`back-btn`}
              hidden={currentQuestion == 1 ? true : false}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Back
            </Button>
            <Button
              className={`next-btn`}
              hidden={currentQuestion >= 14 ? true : false}
              onClick={() => {
                setCurrentQuestion(currentQuestion + 1);
              }}
            >
              Next
            </Button>
          </div>
        </MobileView>
      </div>
    </Container>
  );
};

export default NewDataCenterCalculator;
