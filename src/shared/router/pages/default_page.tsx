import {Outlet} from "react-router-dom";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {MenuSide} from "@/shared/components/menu/menu_side.tsx";

export const DefaultPage = () => {
    return (
        <div className={"w-full h-full flex"}>
            <ResizablePanelGroup
                direction={"horizontal"}
            >
                <ResizablePanel
                    defaultSize={15}
                    minSize={15}
                    maxSize={30}
                >
                    <MenuSide/>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize={85}
                >
                    <Outlet/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}