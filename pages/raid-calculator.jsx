import React, { useEffect } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { useState } from "react";
import { FormGroup, Label, Input, Container } from "reactstrap";
const calculator = () => {
  const [noOfDisks, setNoOfDisks] = useState(0);
  const [sizeOfDrive, setSizeOfDrive] = useState(0);
  const [visibleDisk, setVisibleDisk] = useState([1]);
  const [resultCalculations, setResultCalculations] = useState();
  const [activeDisk, setActiveDisk] = useState(1);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  useEffect(() => {
    activeDisk == 1 && setResultCalculations(noOfDisks * sizeOfDrive);
    activeDisk == 2 &&
      setResultCalculations((noOfDisks * sizeOfDrive) / noOfDisks);
    activeDisk == 3 && setResultCalculations((noOfDisks - 1) * sizeOfDrive);
    activeDisk == 4 && setResultCalculations((noOfDisks - 2) * sizeOfDrive);
    // activeDisk % 2 == 0 && noOfDisks >= 4 ? setResultCalculations(noOfDisks * (sizeOfDrive / 2));
    activeDisk == 5 ? setResultCalculations(noOfDisks * (sizeOfDrive / 2)) : "";
    activeDisk == 6 && setResultCalculations((noOfDisks - 2) * sizeOfDrive);
    activeDisk == 7 && setResultCalculations((noOfDisks - 4) * sizeOfDrive);
  }, [sizeOfDrive, noOfDisks, activeDisk]);

  console.log("activeDisk", activeDisk);

  useEffect(() => {
    setVisibleDisk([1]);
    if (noOfDisks == 2) {
      setVisibleDisk([1, 2]);
    }
    if (noOfDisks >= 3) {
      setVisibleDisk([1, 3]);
    }
    if (noOfDisks >= 4) {
      setVisibleDisk([1, 3, 4]);
    }
    if (noOfDisks % 2 == 0 && noOfDisks == 4) {
      setVisibleDisk([1, 3, 4, 5]);
    }
    if (noOfDisks == 6) {
      setVisibleDisk([1, 3, 4, 5, 6]);
    }
    if (noOfDisks == 7) {
      setVisibleDisk([1, 3, 4, 6]);
    }
    if (noOfDisks >= 8 && noOfDisks % 2 == 0) {
      setVisibleDisk([1, 3, 4, 5, 6, 7]);
    } else if (noOfDisks > 8 && noOfDisks % 2 != 0) {
      setVisibleDisk([1, 3, 4, 6, 7]);
    }
  }, [noOfDisks]);

  const dataOptions = [
    { id: 1, name: "RAID 0" },
    { id: 2, name: "RAID 1" },
    { id: 3, name: "RAID 5" },
    { id: 4, name: "RAID 6" },
    { id: 5, name: "RAID 10" },
    { id: 6, name: "RAID 50" },
    { id: 7, name: "RAID 60" },
  ];
  return (
    <Container>
      <div className="calculatorContainer">
        <div className="upperContainer">
          <h5 className="heading">RAID disk space calculator</h5>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <p className="inputTitle">Number of disks</p>
              <input
                className="inputStyling"
                type="number"
                defaultValue={0}
                onInput={(e) => {
                  setNoOfDisks(e.target.value);
                }}
              />
            </div>
            <div className="driveSizeSection">
              <p className="inputTitle">Size of Each Drive</p>
              <input
                className="inputStyling"
                type="number"
                onInput={(e) => {
                  setSizeOfDrive(e.target.value);
                }}
                defaultValue={0}
              />
              <span className="terabytesSpan"> TB </span>
            </div>
          </div>

          <p className="leftHeadings">SELECT YOUR CONFIGURATION</p>

          <div className="radioBox">
            {dataOptions.map((data, index) => {
              return (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    marginRight: "50px",
                  }}
                  className={`radio-box-wrapper column-class ${
                    visibleDisk.includes(data.id) ? "" : "disabled"
                  }`}
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
          {/* <br /> */}
          <p
            className="readmoreStyling"
            onClick={() => {
              setIsReadMoreOpen((pre) => !pre);
            }}
          >
            Read more about RAID
          </p>
          <div>
            <p className="leftHeadings totalSpace">TOTAL USABLE SPACE</p>
            {noOfDisks == 0 && sizeOfDrive == 0 ? null : (
              <h3 className="resultSpace">
                <span className="resultText"> {resultCalculations} </span>
                <sub>TB of total {noOfDisks * sizeOfDrive} TB </sub>
              </h3>
            )}
          </div>
        </div>

        <div className="description">
          {isReadMoreOpen && (
            <table>
              <tr>
                <td>RAID 0</td>
                <td>
                  A RAID 0 volume distributes data across multiple drives,
                  creating a striped volume that offers improved performance and
                  capacity compared to a single drive. RAID 0 is typically used
                  to improve performance, since reading and writing data can be
                  done in parallel across multiple drives. However, since data
                  is not duplicated, a RAID 0 volume provides no data
                  protection.
                </td>
              </tr>
              <tr>
                <td>RAID 1</td>
                <td>
                  RAID 1 is a type of data storage redundancy in which identical
                  copies of data are stored on multiple disks. RAID 1 requires
                  two drives.
                </td>
              </tr>
              <tr>
                <td>RAID 5</td>
                <td>
                  A RAID 5 is a type of RAID configuration that uses disk
                  striping with parity information distributed across all member
                  disks. This provides redundancy in the event of a single disk
                  failure and improved performance due to the increased
                  parallelism. RAID 5 requires a minimum of three drives.
                </td>
              </tr>
              <tr>
                <td>RAID 6</td>
                <td>
                  A RAID 6 is a type of RAID configuration that uses disk
                  striping and parity information to provide fault tolerance in
                  the event of a drive failure. It is similar to a RAID 5
                  configuration, but with an additional parity block that is
                  distributed across all drives in the array. This allows the
                  array to continue functioning even if one drive fails. RAID 6
                  requires at least four disks.
                </td>
              </tr>
              <tr>
                <td>RAID 10</td>
                <td>
                  RAID 10 is a combination of RAID 1 (mirroring) and RAID 0
                  (striping) that offers improved performance and redundancy
                  over other RAID levels. It is typically used in
                  high-performance applications where data integrity is
                  important. RAID 10 requires at least four disks.
                </td>
              </tr>
              <tr>
                <td>RAID 50</td>
                <td>
                  RAID 50, also called RAID 5+0, combines the straight
                  block-level striping of RAID 0 with the distributed parity of
                  RAID 5. Data is written across a set of disks in a striped
                  manner, and then that data is duplicated on a second set of
                  disks. If one disk fails, the data can be read from the other
                  disk. If two disks fail, the data is lost. RAID 50 requires at
                  least six disks.
                </td>
              </tr>
              <tr>
                <td>RAID 60</td>
                <td>
                  RAID 60 is a type of nested RAID level that combines the
                  block-level stripping feature of RAID level 0 with the dual
                  parity of RAID level 6. It has the same multi-level disk set
                  as of RAID 6, but supports more drives. RAID 60 must be
                  implemented on a minimum of eight disks or a set of four-disk
                  RAID 6 sets to be constructed that can support up to 128
                  drives.
                </td>
              </tr>
            </table>
          )}
        </div>
        {/* <BodyBackgroundColor color="#d4e0fe" /> */}
      </div>
    </Container>
  );
};

export default calculator;
