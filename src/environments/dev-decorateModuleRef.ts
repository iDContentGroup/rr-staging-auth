import { ApplicationRef, NgModuleRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';

// resources: https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
export function decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any> {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;

    // Extra helpers
    let _rr = ({
        probe: _ng.probe,
        tick: _ng.profiler.appRef.tick.bind(_ng.profiler.appRef),
        timeChangeDetection: _ng.profiler.timeChangeDetection.bind(_ng.profiler),
        componentInstance(moo) {
            return _ng.probe(moo).componentInstance;
        }
    } as any);

    if ((<any>window).rr) {
        console.error("Unexpected rr defined already in window");
    }

    (<any>window).rr = _rr;
    // End Extra helpers

    return modRef;
}
