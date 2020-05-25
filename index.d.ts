import { ConstructorOptions } from "logdna";
import Transport from "winston-transport";

declare class LogDNATransport extends Transport {
  constructor(options: LogDNATransport.TransportOptions);
}

declare namespace LogDNATransport {
  interface TransportOptions
    extends Transport.TransportStreamOptions,
      ConstructorOptions {
    /** The LogDNA API key. */
    key: string;
    /** The name of this transport. */
    name?: string;
  }
}

export = LogDNATransport;
