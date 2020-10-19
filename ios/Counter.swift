import Foundation

@objc(Counter)
class Counter: RCTEventEmitter {

    private var count = 10

    @objc
    override func constantsToExport() -> [AnyHashable : Any]! {
        return ["initialCount": 10]
    }

    @objc
    override func supportedEvents() -> [String]! {
        return ["onDecrement", "onIncrement"]
    }

    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    func getCount(_ callback: RCTResponseSenderBlock) {
        callback([count])
    }

    @objc
    func decrement(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
        if(count == 0) {
            let error = NSError(domain: "", code: 200, userInfo: nil)
            reject("E_COUNT", "count cannot be negative.", error)
        } else {
            count -= 1
            sendEvent(withName: "onDecrement", body: ["count": count])
            resolve("count was decremented")
        }
    }

    @objc
    func increment() {
        count += 1
        sendEvent(withName: "onIncrement", body: ["count": count])
    }
}
