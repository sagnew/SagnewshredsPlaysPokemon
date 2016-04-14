function read_file(filename)
    local input = io.open(filename, 'r')
    if input ~= nil then
        io.input(input)
        input_content = io.read()
        io.close(input)

        return input_content
    end

    return nil
end

function file_exists(filename)
    f = io.open(filename, 'r')

    if f ~= nil then
        io.close(f)
        return true
    else
        io.close(f)
        return false
    end
end

while true do
    text_in_file = read_file('button.txt')
    if text_in_file ~= nil then
        emu.message(text_in_file)
    end

    emu.frameadvance()
end
