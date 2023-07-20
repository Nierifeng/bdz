import Service from "../base-service";

class MonitoringService extends Service {
  constructor() {
    super("/api/monitoring");
  }
}
export default MonitoringService;
