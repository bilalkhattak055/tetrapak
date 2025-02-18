import React from "react";
import Routers from "./Route";
import AnimationThemeProvider from "./_helper/AnimationTheme/AnimationThemeProvider";
import CustomizerProvider from "./_helper/Customizer/CustomizerProvider";
import GalleryProvider from "./_helper/Gallery/GalleryProvider";
import PopupStateProvider from "./_helper/popupState/PopupStateProvider";
import FormDataProvider from "./_helper/formData/formDataProvider";
import ResyncProvider from "./_helper/resync/ResyncProvider";
import LiveAlertProvider from "./_helper/formData/LiveAlert/LiveAlertProvider";
import LiveAnalyticProvider from "./_helper/formData/LiveAnalytics/LiveAnalyticProvider";
import AreaAnalysisProvider from "./_helper/formData/AreaAnalysis/AreaAnalysisProvider";
import SubAreaProvider from "./_helper/formData/SubAreaAnalysis/SubAreaProvider";
import TargetControlProvider from "./_helper/formData/TargetControl/TargetControlProvider";

const App = () => (
  <div className="App">
    <CustomizerProvider>
      <GalleryProvider>
      <AnimationThemeProvider>
        <FormDataProvider>
          <LiveAnalyticProvider>
            <AreaAnalysisProvider>
            <SubAreaProvider>
              <TargetControlProvider>
          <LiveAlertProvider>
        <PopupStateProvider>
          <ResyncProvider>
        <Routers />
        </ResyncProvider>
        </PopupStateProvider>
          </LiveAlertProvider>
          </TargetControlProvider>
          </SubAreaProvider>
          </AreaAnalysisProvider>
          </LiveAnalyticProvider>
        </FormDataProvider>
      </AnimationThemeProvider>
      </GalleryProvider>
    </CustomizerProvider>
  </div>
);

export default App;
