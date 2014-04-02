-- luohumall support
module("luohumall", package.seeall)

curl = require "luacurl"

function _fetch_uri(url, c)
    local result = { }
    if c == nil then
        c = curl.new()
    end
    c:setopt(curl.OPT_URL, url)
    c:setopt(curl.OPT_WRITEDATA, result)
    c:setopt(curl.OPT_WRITEFUNCTION, function(tab, buffer)
        table.insert(tab, buffer)
        return #buffer
    end)
    local ok = c:perform()
    return ok, table.concat(result)
end
