interface MapSettings {
  scrollZoom: boolean;
  boxZoom: boolean;
  dragRotate: boolean;
  dragPan: boolean;
  keyboard: boolean;
  doubleClickZoom: boolean;
  touchZoomRotate: boolean;
  touchPitch: boolean;
  minZoom: number;
  maxZoom: number;
  minPitch: number;
  maxPitch: number;
}

interface ControlPanelProps {
  settings: MapSettings;
  onChange: (name: keyof MapSettings, value: boolean | number) => void;
}

export default function ControlPanel({ settings, onChange }: ControlPanelProps) {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Limit Map Interaction
        </h3>
        <p className="text-sm text-gray-600">
          Turn interactive features off/on.
        </p>
      </div>

      <div className="mb-4">
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            className="mr-2"
            defaultChecked={false}
            onChange={() => {}}
          />
          View Code
        </label>
      </div>

      <div className="space-y-2 mb-4">
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.scrollZoom}
            onChange={(e) => onChange('scrollZoom', e.target.checked)}
            className="mr-2"
          />
          SCROLL ZOOM
        </label>
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.boxZoom}
            onChange={(e) => onChange('boxZoom', e.target.checked)}
            className="mr-2"
          />
          BOX ZOOM
        </label>
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.dragRotate}
            onChange={(e) => onChange('dragRotate', e.target.checked)}
            className="mr-2"
          />
          DRAG ROTATE
        </label>
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.dragPan}
            onChange={(e) => onChange('dragPan', e.target.checked)}
            className="mr-2"
          />
          DRAG PAN
        </label>
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.keyboard}
            onChange={(e) => onChange('keyboard', e.target.checked)}
            className="mr-2"
          />
          KEYBOARD
        </label>
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.doubleClickZoom}
            onChange={(e) => onChange('doubleClickZoom', e.target.checked)}
            className="mr-2"
          />
          DOUBLE CLICK ZOOM
        </label>
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.touchZoomRotate}
            onChange={(e) => onChange('touchZoomRotate', e.target.checked)}
            className="mr-2"
          />
          TOUCH ZOOM ROTATE
        </label>
        <label className="flex items-center text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.touchPitch}
            onChange={(e) => onChange('touchPitch', e.target.checked)}
            className="mr-2"
          />
          TOUCH PITCH
        </label>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            MIN ZOOM
          </label>
          <input
            type="number"
            value={settings.minZoom}
            onChange={(e) => onChange('minZoom', Number(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            MAX ZOOM
          </label>
          <input
            type="number"
            value={settings.maxZoom}
            onChange={(e) => onChange('maxZoom', Number(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            MIN PITCH
          </label>
          <input
            type="number"
            value={settings.minPitch}
            onChange={(e) => onChange('minPitch', Number(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            MAX PITCH
          </label>
          <input
            type="number"
            value={settings.maxPitch}
            onChange={(e) => onChange('maxPitch', Number(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );
}

