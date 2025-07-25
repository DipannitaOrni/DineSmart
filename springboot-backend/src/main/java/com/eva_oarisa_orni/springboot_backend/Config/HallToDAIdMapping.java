package com.eva_oarisa_orni.springboot_backend.Config;



import java.util.HashMap;
import java.util.Map;

public class HallToDAIdMapping {

    private static final Map<String, Long> hallToDaIdMap = new HashMap<>();

    static {
        hallToDaIdMap.put("Shamshen Nahar Khan Hall", 2L);
        hallToDaIdMap.put("Tapashi Rabeya Hall", 1L);
        hallToDaIdMap.put("Bangabandhu Hall", 3L);
        hallToDaIdMap.put("Dr. Qudrat-E-Huda Hall", 4L);
        hallToDaIdMap.put("Shahid Mohammad Shah Hall", 5L);
        hallToDaIdMap.put("Shahid Tareq Huda Hall", 6L);
        hallToDaIdMap.put("Sheikh Russel Hall", 7L);
        hallToDaIdMap.put("Sufia Kamal Hall", 8L);
    }

    public static Long getDaIdForHall(String hallName) {
        return hallToDaIdMap.get(hallName);
    }
}
