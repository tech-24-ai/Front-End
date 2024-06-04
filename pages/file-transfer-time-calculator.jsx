import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Container } from "reactstrap";

const FileTransferTimeCalculator = () => {
  const [fileSize, setFileSize] = useState(10);
  const [transferRate, setTransferRate] = useState(1.544);
  const [DHMS_result, setDHMS_result] = useState();
  const [sizeUnits, setSizeUnits] = useState("GB");
  const [transferRateUnit, setTransferRateUnit] = useState("Mbps");

  const [T1DS1Line, setT1DS1Line] = useState();
  const [Ethernet, setEthernet] = useState();
  const [FastEthernet, setFastEthernet] = useState();
  const [GigabitEthernet, setGigabitEthernet] = useState();
  const [TenGigabitEthernet, setTenGigabitEthernet] = useState();
  const [USB2, setUSB2] = useState();
  const [USB3, setUSB3] = useState();
  const [Thunderbolt2, setThunderbolt2] = useState();

  // let T1DS1Line = fileSize / (1.544 / 8000)
  // let Ethernet = fileSize / (10 / 8000)
  // let FastEthernet = fileSize / (100 / 8000)
  // let GigabitEthernet = fileSize / (1000 / 8000)
  // let TenGigabitEthernet = fileSize / (10000 / 8000)
  // let USB2 = fileSize / (480 / 8000)
  // let USB3 = fileSize / (5000 / 8000)
  // let Thunderbolt2 = fileSize / (20000 / 8000)

  // const getCurrentSelectedSizeType = (sizeUnitsValues) => {
  //   setSizeUnits(sizeUnitsValues)
  //   // console.log("sizeUnits",sizeUnits);
  // };
  // const getCurrentSelectedTransferRate = (transferRateValues) => {
  //   if(transferRateValues == 'Mbps'){
  //     setTransferRate(transferRate)
  //   }
  //   else if(transferRateValues == 'bps'){
  //     setTransferRate(transferRate / 1000000)
  //   }
  //   else if(transferRateValues == 'kbps'){
  //     setTransferRate(transferRate / 1000)
  //   }
  //   else if(transferRateValues == 'Gbps'){
  //     setTransferRate(transferRate * 1000)
  //   }
  //   else if(transferRateValues == 'Tbps'){
  //     setTransferRate(transferRate * 1000000)
  //   }
  //   else if(transferRateValues == 'B/s'){
  //     setTransferRate(transferRate * 0.0000080)
  //   }
  //   else if(transferRateValues == 'KB/s'){
  //     setTransferRate(transferRate * 0.008)
  //   }
  //   else if(transferRateValues == 'GB/s'){
  //     setTransferRate(transferRate * 8000)
  //   }
  //   else if(transferRateValues == 'TB/s'){
  //     setTransferRate(transferRate * 8000000)
  //   }
  //   else if(transferRateValues == 'KiB/s'){
  //     setTransferRate(transferRate * 0.008192)
  //   }
  //   else if(transferRateValues == 'MiB/s'){
  //     setTransferRate(transferRate * 8.388608)
  //   }
  //   else if(transferRateValues == 'GiB/s'){
  //     setTransferRate(transferRate * 8589.93459)
  //   }
  //   else if(transferRateValues == 'TiB/s'){
  //     setTransferRate(transferRate * 8796093.02)
  //   }
  // };

  const getTransferRate = (value, rate) => {
    let finalValue = value;
    switch (rate) {
      case "Mbps":
        return finalValue;

      case "bps":
        return value / 1000000;

      case "kbps":
        return value / 1000;

      case "Gbps":
        return value * 1000;

      case "Tbps":
        return value * 1000000;

      case "B/s":
        return value * 0.000008;
      case "KB/s":
        return value * 0.008;
      case "GB/s":
        return value * 8000;
      case "TB/s":
        return value * 8000000;
      case "KiB/s":
        return value * 0.008192;
      case "MiB/s":
        return value * 8.388608;
      case "GiB/s":
        return value * 8589.93459;
      case "TiB/s":
        return value * 8796093.02;

      default:
        return 0;
    }
  };

  const calculate = () => {
    // console.log("sizeUnits",sizeUnits);
    // console.log("fileSize",fileSize);
    const TRate = getTransferRate(transferRate, transferRateUnit);
    // console.log('TRate',TRate)
    if (fileSize < 0) {
      // alert("negative number's are not allowed");
      setFileSize(Math.abs(fileSize));
    } else if (sizeUnits == "GB") {
      let time = fileSize / (TRate / 8000);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line(fileSize / (1.544 / 8000));
      setEthernet(fileSize / (10 / 8000));
      setFastEthernet(fileSize / (100 / 8000));
      setGigabitEthernet(fileSize / (1000 / 8000));
      setTenGigabitEthernet(fileSize / (10000 / 8000));
      setUSB2(fileSize / (480 / 8000));
      setUSB3(fileSize / (5000 / 8000));
      setThunderbolt2(fileSize / (20000 / 8000));
    } else if (sizeUnits == "B") {
      let time = fileSize / 1000000 / (TRate / 8);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line(fileSize / 1000000 / (1.544 / 8));
      setEthernet(fileSize / 1000000 / (10 / 8));
      setFastEthernet(fileSize / 1000000 / (100 / 8));
      setGigabitEthernet(fileSize / 1000000 / (1000 / 8));
      setTenGigabitEthernet(fileSize / 1000000 / (10000 / 8));
      setUSB2(fileSize / 1000000 / (480 / 8));
      setUSB3(fileSize / 1000000 / (5000 / 8));
      setThunderbolt2(fileSize / 1000000 / (20000 / 8));
    } else if (sizeUnits == "KB") {
      let time = fileSize / 1000 / (TRate / 8);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line(fileSize / 1000 / (1.544 / 8));
      setEthernet(fileSize / 1000 / (10 / 8));
      setFastEthernet(fileSize / 1000 / (100 / 8));
      setGigabitEthernet(fileSize / 1000 / (1000 / 8));
      setTenGigabitEthernet(fileSize / 1000 / (10000 / 8));
      setUSB2(fileSize / 1000 / (480 / 8));
      setUSB3(fileSize / 1000 / (5000 / 8));
      setThunderbolt2(fileSize / 1000 / (20000 / 8));
    } else if (sizeUnits == "MB") {
      let time = fileSize / (TRate / 8);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line(fileSize / (1.544 / 8));
      setEthernet(fileSize / (10 / 8));
      setFastEthernet(fileSize / (100 / 8));
      setGigabitEthernet(fileSize / (1000 / 8));
      setTenGigabitEthernet(fileSize / (10000 / 8));
      setUSB2(fileSize / (480 / 8));
      setUSB3(fileSize / (5000 / 8));
      setThunderbolt2(fileSize / (20000 / 8));
    } else if (sizeUnits == "TB") {
      let time = (fileSize * 1000) / (TRate / 8000);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line((fileSize * 1000) / (1.544 / 8000));
      setEthernet((fileSize * 1000) / (10 / 8000));
      setFastEthernet((fileSize * 1000) / (100 / 8000));
      setGigabitEthernet((fileSize * 1000) / (1000 / 8000));
      setTenGigabitEthernet((fileSize * 1000) / (10000 / 8000));
      setUSB2((fileSize * 1000) / (480 / 8000));
      setUSB3((fileSize * 1000) / (5000 / 8000));
      setThunderbolt2((fileSize * 1000) / (20000 / 8000));
    } else if (sizeUnits == "KiB") {
      let time = Math.round(fileSize / 976.6) / (TRate / 8);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line(fileSize / 976.6 / (1.544 / 8));
      setEthernet(fileSize / 976.6 / (10 / 8));
      setFastEthernet(fileSize / 976.6 / (100 / 8));
      setGigabitEthernet(fileSize / 976.6 / (1000 / 8));
      setTenGigabitEthernet(fileSize / 976.6 / (10000 / 8));
      setUSB2(fileSize / 976.6 / (480 / 8));
      setUSB3(fileSize / 976.6 / (5000 / 8));
      setThunderbolt2(fileSize / 976.6 / (20000 / 8));
    } else if (sizeUnits == "MiB") {
      let time = Math.round(fileSize * 1.048576) / (TRate / 8);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line((fileSize * 1.048576) / (1.544 / 8));
      setEthernet((fileSize * 1.048576) / (10 / 8));
      setFastEthernet((fileSize * 1.048576) / (100 / 8));
      setGigabitEthernet((fileSize * 1.048576) / (1000 / 8));
      setTenGigabitEthernet((fileSize * 1.048576) / (10000 / 8));
      setUSB2((fileSize * 1.048576) / (480 / 8));
      setUSB3((fileSize * 1.048576) / (5000 / 8));
      setThunderbolt2((fileSize * 1.048576) / (20000 / 8));
    } else if (sizeUnits == "GiB") {
      let time = (fileSize * 1073.74182) / (TRate / 8);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line(fileSize / 1073.74182 / (1.544 / 8));
      setEthernet((fileSize * 1073.74182) / (10 / 8));
      setFastEthernet((fileSize * 1073.74182) / (100 / 8));
      setGigabitEthernet((fileSize * 1073.74182) / (1000 / 8));
      setTenGigabitEthernet((fileSize * 1073.74182) / (10000 / 8));
      setUSB2((fileSize * 1073.74182) / (480 / 8));
      setUSB3((fileSize * 1073.74182) / (5000 / 8));
      setThunderbolt2((fileSize * 1073.74182) / (20000 / 8));
    } else if (sizeUnits == "TiB") {
      let time = (fileSize * 1099511.63) / (TRate / 8);
      let days = Math.floor(time / (24 * 60 * 60));
      let hours = Math.floor((time % (3600 * 24)) / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.round((time % 3600) % 60);
      setDHMS_result(`${days}:${hours}:${minutes}:${seconds}`);
      setT1DS1Line((fileSize * 1099511.63) / (1.544 / 8));
      setEthernet((fileSize * 1099511.63) / (10 / 8));
      setFastEthernet((fileSize * 1099511.63) / (100 / 8));
      setGigabitEthernet((fileSize * 1099511.63) / (1000 / 8));
      setTenGigabitEthernet((fileSize * 1099511.63) / (10000 / 8));
      setUSB2((fileSize * 1099511.63) / (480 / 8));
      setUSB3((fileSize * 1099511.63) / (5000 / 8));
      setThunderbolt2((fileSize * 1099511.63) / (20000 / 8));
    }
  };
  useEffect(() => {
    calculate();
    // getCurrentSelectedSizeType('GB');
    // getCurrentSelectedTransferRate('Mbps');
  }, []);

  return (
    <Container>
      <div className="FTTcalculatorContainer">
        <h5 className="heading">File Transfer Time Calculator</h5>
        <h5 style={{ marginTop: "25px" }}>
          Enter{" "}
          <span style={{ fontWeight: "bold" }}>File size, Transfer Rate,</span>{" "}
          select units, and then click{" "}
          <span style={{ fontWeight: "bold" }}>Calculate.</span>
        </h5>
        <div className="mainContainer">
          <div>
            <p className="inputHeading">file size : </p>
            <input
              className="fileSizeInput"
              type="number"
              onInput={(e) => setFileSize(e.target.value)}
              value={fileSize}
            />
            <select
              onChange={(sizeUnitsValues) =>
                setSizeUnits(sizeUnitsValues.target.value)
              }
            >
              <option value="B">B</option>
              <option value="KB">KB</option>
              <option value="MB">MB</option>
              <option selected="selected" value="GB">
                GB
              </option>
              <option value="TB">TB</option>
              <option value="KiB">KiB</option>
              <option value="MiB">MiB</option>
              <option value="GiB">GiB</option>
              <option value="TiB">TiB</option>
            </select>
          </div>
          <div>
            <p className="inputHeading">Transfer Rate : </p>
            <input
              type="number"
              onInput={(e) => setTransferRate(e.target.value)}
              value={transferRate}
            />
            <select
              onChange={(transferRateValues) =>
                setTransferRateUnit(transferRateValues.target.value)
              }
            >
              <option value="bps">bps</option>
              <option value="kbps">kbps</option>
              <option selected="selected" value="Mbps">
                Mbps
              </option>
              <option value="Gbps">Gbps</option>
              <option value="Tbps">Tbps</option>
              <option value="B/s">B/s</option>
              <option value="KB/s">KB/s</option>
              <option value="MB/s">MB/s</option>
              <option value="GB/s">GB/s</option>
              <option value="TB/s">TB/s</option>
              <option value="KiB/s">KiB/s</option>
              <option value="MiB/s">MiB/s</option>
              <option value="GiB/s">GiB/s</option>
              <option value="TiB/s">TiB/s</option>
            </select>
          </div>
        </div>
        <div className="resultSection">
          {/* <button
            onClick={calculate}
            type="button"
            className="calculateBtn btn btn-secondary"
          >
            Calculate
          </button> */}
          <div onClick={calculate} type="button" className="custom-btn with-bg">
            Calculate
          </div>
          <h5 className="result">Transfer Time (d:h:m:s) : {DHMS_result}</h5>
        </div>
        {/* <h5 style={{ margin: "25px 0px" }}>For comparison : </h5>
      <div className="resultContainer">
        <div>
          {/* <p>
            Estimated time to transfer <span style={{ fontWeight: "bold" }}>{`${fileSize} ${sizeUnits}`}</span> file over different network links
            <span style={{ fontWeight: "bold" }}> (d:h:m:s):</span>
          </p> }
          <p>T1/DS1 line (1.544 Mbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(T1DS1Line / (24 * 60 * 60))}:${Math.floor((T1DS1Line % (3600 * 24)) / 3600)}:${Math.floor((T1DS1Line % 3600) / 60)}:${Math.floor((T1DS1Line % 3600) % 60)}`}</span></p>
          <p>Ethernet (10 Mbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(Ethernet / (24 * 60 * 60))}:${Math.floor((Ethernet % (3600 * 24)) / 3600)}:${Math.floor((Ethernet % 3600) / 60)}:${Math.floor((Ethernet % 3600) % 60)}`}</span></p>
          <p>Fast Ethernet (100 Mbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(FastEthernet / (24 * 60 * 60))}:${Math.floor((FastEthernet % (3600 * 24)) / 3600)}:${Math.floor((FastEthernet % 3600) / 60)}:${Math.floor((FastEthernet % 3600) % 60)}`}</span></p>
          <p>Gigabit Ethernet (1000 Mbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(GigabitEthernet / (24 * 60 * 60))}:${Math.floor((GigabitEthernet % (3600 * 24)) / 3600)}:${Math.floor((GigabitEthernet % 3600) / 60)}:${Math.floor((GigabitEthernet % 3600) % 60)}`}</span></p>
          <p>10 Gigabit Ethernet (10 Gbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(TenGigabitEthernet / (24 * 60 * 60))}:${Math.floor((TenGigabitEthernet % (3600 * 24)) / 3600)}:${Math.floor((TenGigabitEthernet % 3600) / 60)}:${Math.floor((TenGigabitEthernet % 3600) % 60)}`}</span></p>
        </div>
        <div className="resultContainerDivTwo">
          {/* <p>
            Estimated time to transfer <span style={{ fontWeight: "bold" }}>{`${fileSize} ${sizeUnits}`}</span> file over different computer
            interfaces <span style={{ fontWeight: "bold" }}> (d:h:m:s):</span>
          </p> }
          <p>USB 2.0 (480 Mbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(USB2 / (24 * 60 * 60))}:${Math.floor((USB2 % (3600 * 24)) / 3600)}:${Math.floor((USB2 % 3600) / 60)}:${Math.round((USB2 % 3600) % 60)}`}</span></p>
          <p>USB 3.0 (5 Gbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(USB3 / (24 * 60 * 60))}:${Math.floor((USB3 % (3600 * 24)) / 3600)}:${Math.floor((USB3 % 3600) / 60)}:${Math.floor((USB3 % 3600) % 60)}`}</span></p>
          <p>Thunderbolt (10 Gbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(TenGigabitEthernet / (24 * 60 * 60))}:${Math.floor((TenGigabitEthernet % (3600 * 24)) / 3600)}:${Math.floor((TenGigabitEthernet % 3600) / 60)}:${Math.floor((TenGigabitEthernet % 3600) % 60)}`}</span></p>
          <p>Thunderbolt 2 (20 Gbps) - <span style={{fontWeight:'bold'}}>{`${Math.floor(Thunderbolt2 / (24 * 60 * 60))}:${Math.floor((Thunderbolt2 % (3600 * 24)) / 3600)}:${Math.floor((Thunderbolt2 % 3600) / 60)}:${Math.floor((Thunderbolt2 % 3600) % 60)}`}</span></p>
        </div>
      </div> */}
      </div>
    </Container>
  );
};

export default FileTransferTimeCalculator;
