import json

example_variable_data = {
    "Толщина снега по реке": {
        "description": "Глубина снежного покрова вдоль реки",
        "unit": {
            "name": "Измерение в сантиметрах",
            "symbol": "см",
            "description": "Используется для измерения глубины снега"
        }
    },
    "Толщина снега в снегомере №1": {
        "description": "Глубина снежного покрова, измеренная на первом снеговом датчике",
        "unit": {
            "name": "Измерение в сантиметрах",
            "symbol": "см",
            "description": "Используется для измерения глубины снега"
        }
    },
    "Толщина снега в снегомере №2": {
        "description": "Глубина снежного покрова, измеренная на втором снеговом датчике",
        "unit": {
            "name": "Измерение в сантиметрах",
            "symbol": "см",
            "description": "Используется для измерения глубины снега"
        }
    },
    "Вес снега в снегомере №1": {
        "description": "Вес снежного покрова, измеренный на первом весовом датчике",
        "unit": {
            "name": "Измерение в миллиметрах водного эквивалента",
            "symbol": "мм",
            "description": "Используется для измерения водного эквивалента снега"
        }
    },
    "Вес снега в снегомере №2": {
        "description": "Вес снежного покрова, измеренный на втором весовом датчике",
        "unit": {
            "name": "Измерение в миллиметрах водного эквивалента",
            "symbol": "мм",
            "description": "Используется для измерения водного эквивалента снега"
        }
    }
}

file_path = "./snow_data.json"
with open(file_path, "r", encoding="utf-8") as f:
    raw_data = json.load(f)

example_variable_names = list(example_variable_data.keys())

transformed_all = []
for i, item in enumerate(raw_data):
    var_name = example_variable_names[i % len(example_variable_names)]
    var_info = example_variable_data[var_name]

    transformed_all.append({
        "catalog": {
            "site": {
                "code": item["site"]["site_code"],
                "name": item["site"]["site_name"],
                "latitude": item["site"]["latitude"],
                "longtitude": item["site"]["longitude"],
                "siteType": {
                    "name": "Снегомерный пункт",
                    "description": "Снегомерный датчик или автоматическая станция"
                }
            },
            "variable": {
                "name": var_name,
                "description": var_info["description"],
                "unit": var_info["unit"]
            },
            "method": {
                "name": "Автоматическое",
                "description": "Автоматическое измерение"
            },
            "source": {
                "name": "Laboratory of Digital Technologies and Modeling, Sarsen Amanzholov East Kazakhstan University",
            }
        },
        "category": {
            "name": "Замеры снега",
            "description": "Замеры снега по разным параметрам."
        },
        "date_utc": item["date"],
        "value": float(str(item["value"]).strip()) if str(item["value"]).strip() else None,
        "qcl": {
            "name": "Проверено",
            "description": "Проверено вручную или автоматически."
        }
    })

output_path = "./transformed_snow_data.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(transformed_all, f, ensure_ascii=False, indent=2)
