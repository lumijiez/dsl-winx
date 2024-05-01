export const jsonData = [ {
    "name" : "Database",
    "interfaces" : [ {
        "name" : "Database",
        "functions" : [ {
            "name" : "GetUserList",
            "access_modifier" : "public",
            "implemented_interface" : "none",
            "importance" : "optional",
            "inputTypes" : [ {
                "type" : "FLOAT",
                "identifier" : "x"
            }, {
                "type" : "STRING",
                "identifier" : "ag"
            } ],
            "returnTypes" : [ {
                "type" : "\"CustomDataType\"",
                "identifier" : "x"
            } ],
            "specificationEntries" : [ {
                "key" : "ExecTime",
                "value" : "\"10s\""
            }, {
                "key" : "MaxReturnVals",
                "value" : "\"10s\""
            } ]
        } ]
    }, {
        "name" : "DatabaseAccessImpl",
        "functions" : [ {
            "name" : "GetUserList",
            "access_modifier" : "protected",
            "implemented_interface" : "none",
            "importance" : "critical",
            "inputTypes" : [ {
                "type" : "FLOAT",
                "identifier" : "x"
            }, {
                "type" : "STRING",
                "identifier" : "ag"
            } ],
            "returnTypes" : [ {
                "type" : "\"CustomDataType\"",
                "identifier" : "x"
            } ],
            "specificationEntries" : [ {
                "key" : "ExecTime",
                "value" : "\"10s\""
            }, {
                "key" : "MaxReturnVals",
                "value" : "\"10s\""
            } ]
        } ]
    } ],
    "specifications" : [ {
        "name" : "DatabaseAccess",
        "implemented_interface" : "Database",
        "requirements" : [ {
            "name" : "DatabaseAccessMember",
            "annotations" : [ {
                "importance" : "optional",
                "name" : "UserHasAdminAccess"
            }, {
                "importance" : "critical",
                "name" : "UserIsNotBanned"
            } ]
        } ],
        "results" : [ {
            "name" : "DatabaseAdminPanel",
            "importance" : "optional"
        }, {
            "name" : "DatabaseVisualizerPanel",
            "importance" : "critical"
        }, {
            "name" : "Clock",
            "importance" : "none"
        } ],
        "functions" : [ {
            "name" : "GetUserList",
            "access_modifier" : "public",
            "implemented_interface" : "DatabaseAccessImpl",
            "importance" : "critical",
            "inputTypes" : [ {
                "type" : "FLOAT",
                "identifier" : "x"
            }, {
                "type" : "STRING",
                "identifier" : "ag"
            } ],
            "returnTypes" : [ {
                "type" : "INT",
                "identifier" : "x"
            } ],
            "specificationEntries" : [ {
                "key" : "ExecTime",
                "value" : "\"10s\""
            }, {
                "key" : "MaxReturnVals",
                "value" : "\"10s\""
            } ]
        }, {
            "name" : "GetUserdList",
            "access_modifier" : "private",
            "implemented_interface" : "Database",
            "importance" : "optional",
            "inputTypes" : [ {
                "type" : "FLOAT",
                "identifier" : "x"
            }, {
                "type" : "STRING",
                "identifier" : "ag"
            } ],
            "returnTypes" : [ {
                "type" : "INT",
                "identifier" : "x"
            } ],
            "specificationEntries" : [ {
                "key" : "ExecTime",
                "value" : "\"10s\""
            }, {
                "key" : "MaxReturnVals",
                "value" : "\"10s\""
            } ]
        }, {
            "name" : "GetUserdfList",
            "access_modifier" : "public",
            "implemented_interface" : "Database",
            "importance" : "optional",
            "inputTypes" : [ {
                "type" : "FLOAT",
                "identifier" : "x"
            }, {
                "type" : "STRING",
                "identifier" : "ag"
            } ],
            "returnTypes" : [ {
                "type" : "INT",
                "identifier" : "x"
            } ],
            "specificationEntries" : [ {
                "key" : "ExecTime",
                "value" : "\"10s\""
            }, {
                "key" : "MaxReturnVals",
                "value" : "\"10s\""
            } ]
        }, {
            "name" : "GetUsesfrList",
            "access_modifier" : "private",
            "implemented_interface" : "Database",
            "importance" : "optional",
            "inputTypes" : [ {
                "type" : "FLOAT",
                "identifier" : "x"
            }, {
                "type" : "STRING",
                "identifier" : "ag"
            } ],
            "returnTypes" : [ {
                "type" : "INT",
                "identifier" : "x"
            } ],
            "specificationEntries" : [ {
                "key" : "ExecTime",
                "value" : "\"10s\""
            }, {
                "key" : "MaxReturnVals",
                "value" : "\"10s\""
            } ]
        } ],
        "implementedInterface" : "Database"
    } ]
} ];