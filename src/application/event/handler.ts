import Event from "../../domain/building-blocks/event"

export interface Handler {
    handlerEventName: string
    handle(event: Event): Promise<void>
}
