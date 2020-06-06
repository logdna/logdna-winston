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
    /** The name of this transport (default: "LogDNA"). */
    name?: string;
    /** Level of messages that this transport should log (default: "debug"). */
    level?: string;
    /**
     * Allow meta objects to be passed with each line (default: false).
     * See logger ConstructorOptions for more information.
     */
    index_meta?: boolean;
  }
}

export = LogDNATransport;
