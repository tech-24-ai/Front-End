import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EmbeddedPDFViewer from "../../../components/embeddedPDF/embeddedPDFViewer";
import { alertActions, loaderActions } from "../../../_actions";
import { crudService } from "../../../_services";
import { useRouter } from "next/router";

const index = ({ showLoader }) => {
  const [viewDocument, setViewDocument] = useState(false);
  const [documentBlog, setDocumentBlog] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const router = useRouter();

  useEffect(async () => {
    const viewDoc = JSON.parse(localStorage.getItem("viewDoc"));
    if (viewDoc) {
      console.log("viewDoc", viewDoc);
      const { isEmbedded, extension, document_id, name } = viewDoc;
      console.log("isEmbedded", isEmbedded);
      if (isEmbedded && extension == "pdf") {
        showLoader();
        await crudService
          ._download(`document?document_id=${document_id}`)
          .then((res) => {
            if (res.status === 200) {
              let base64String;
              let reader = new FileReader();
              reader.readAsDataURL(res.data);
              reader.onloadend = () => {
                base64String = reader.result;
                setDocumentName(name);
                setDocumentBlog(base64String);
                setViewDocument(true);
              };
            }
          });
      }
    }
  }, [router]);

  return (
    <div>
      {viewDocument && (
        <EmbeddedPDFViewer
          fileUrl={documentBlog}
          name={documentName}
          selector="#portal"
          handler={() => window.close()}
        />
      )}
    </div>
  );
};

const actionCreators = {
  showError: alertActions.error,
  showLoader: loaderActions.show,
};

export default connect(null, actionCreators)(index);
